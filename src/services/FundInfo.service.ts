import { KeyValueStore } from '../utils';
import { textTvCommunicator } from '../communicators';
import {
    FundInfo,
    IFundInfo,
    IFundDetail,
    FundDetail,
    IFundInfoStorageItem,
    FundInfoStorageItem,
} from '../models';
import * as moment from 'moment';
import { userFundService } from './UserFund.service';

class FundInfoService {
    private fundStore = new KeyValueStore<IFundInfoStorageItem[]>('fondkollen', 'dailySnapshot');

    public async getFundInfo(): Promise<IFundInfo[]> {
        let allFunds: IFundInfo[] = [];
        const document = new Document();
        const topElement: HTMLElement = document.createElement('rootEl');

        // const pages = await textTvCommunicator.getFundPages();
        const pages = await textTvCommunicator.getFundPagesMock();
        const allContent = [];
        for (let index = 0; index < pages.length; index++) {
            allContent.push(pages[index].content);
        }

        for (let index = 0; index < allContent.length; index++) {
            const element = allContent[index];
            topElement.insertAdjacentHTML('afterbegin', element);
        }
        document.appendChild(topElement);

        const rootElements = document.getElementsByClassName('root');

        for (let index = 0; index < rootElements.length; index++) {
            const root = rootElements[index];

            let fundInfo = new FundInfo('');
            const childNodes = Array.from(root.childNodes);
            for (let j = 0; j < childNodes.length; j++) {
                const node = childNodes[j];
                const element = root.childNodes[j] as Element;
                // console.log(node);
                if (element.className === 'G' && element.innerHTML.trim() !== '') {
                    if (fundInfo.funds.length > 0) {
                        allFunds = this.addFundInfo(fundInfo, allFunds);
                    }
                    fundInfo = new FundInfo(element.innerHTML.trim());
                }
                if (fundInfo.company && element.className === 'W') {
                    const maxItems = childNodes.length - j < 20 ? childNodes.length - j : 20;
                    const nodes = childNodes.slice(j - 1, j + maxItems - 2);
                    const fundDetail = this.getFundDetails(nodes);
                    if (fundDetail) {
                        fundInfo.funds.push(fundDetail);
                    }
                }
            }
            if (fundInfo.funds.length > 0) {
                allFunds = this.addFundInfo(fundInfo, allFunds);
            }
        }

        allFunds.sort((a, b) => {
            const x = a.company.toLowerCase();
            const y = b.company.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });

        // Here we add our daily record
        this.addFundInfoToStorage(await this.getFundStorageItems(allFunds));

        return allFunds;
    }

    /**
     * Get only items the user has interest in (shares)
     */
    public async getFundStorageItems(allFunds: IFundInfo[]): Promise<IFundInfoStorageItem[]> {
        const userFunds = await userFundService.getFunds();
        const fundInfoStorageItems: IFundInfoStorageItem[] = [];
        userFunds.forEach((userFund) => {
            const companyItem = allFunds.find((item) => item.company === userFund.company);
            if (companyItem) {
                const fundDetail = companyItem.funds.find((fund) => fund.name === userFund.name);
                if (fundDetail) {
                    fundInfoStorageItems.push(
                        new FundInfoStorageItem(
                            companyItem.company,
                            fundDetail.name,
                            fundDetail.price,
                            fundDetail.dailyPercentage,
                            fundDetail.yearlyPercentage,
                        ),
                    );
                }
            }
        });
        return fundInfoStorageItems;
    }

    private async addFundInfoToStorage(filteredFunds: IFundInfoStorageItem[]) {
        // If after kl 18:30 set next bankday with slutkurser (Current)
        const time = new Date().toLocaleTimeString('sv-se');
        // if (time > '18:30') {
        //     await this.fundStore.setItem(
        //         new Date('Bankday').toLocaleDateString('sv-se'),
        //         filteredFunds,
        //     );
        // }

        // Justera kurserna på dagens datum och spara
        const date = new Date().toLocaleDateString('sv-se');
        // await this.fundStore.setItem(new Date().toLocaleDateString('sv-se'), filteredFunds);
    }

    private addFundInfo(fundInfo: IFundInfo, fundInfos: IFundInfo[]): IFundInfo[] {
        const index = fundInfos.findIndex((item) => {
            return item.company === fundInfo.company;
        });
        fundInfo.funds.sort((a, b) => {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        if (index >= 0) {
            fundInfos[index].funds = fundInfos[index].funds.concat(fundInfo.funds);
        } else {
            fundInfos.push(fundInfo);
        }
        return fundInfos;
    }

    private getFundDetails(nodes: ChildNode[]): IFundDetail | null {
        if (nodes[0].nodeType !== 3) {
            return null;
        }
        const fundName = String(nodes[0].nodeValue).trim();
        if (fundName.length < 1) {
            return null;
        }
        const fundValue = this.getFundValue(nodes);

        const fund = new FundDetail(fundName, fundValue);

        console.log('fundDetail', fund);

        // for (let index = nodes.length - 1; index > 0; index--) {
        //     const element = elements[index];
        //     if (element.className === 'C' || element.className === 'Y') {
        //         if (fund.yearlyPercentage) {
        //             fund.dailyPercentage = Number(element.innerHTML.trim());
        //         } else {
        //             fund.yearlyPercentage = Number(element.innerHTML.trim());
        //         }
        //     }
        // }
        // return fund.yearlyPercentage ? fund : null;
        return null;
    }

    private getFundValue(nodes: ChildNode[]): number {
        let value: number = 0.0;
        for (let index = 1; index < nodes.length - 1; index++) {
            const element = nodes[index] as Element;
            if (element.className !== 'W') {
                return value;
            }
            const elementValue = Number(element.innerHTML.trim());
            if (!isNaN(elementValue)) {
                value += Number(elementValue);
            }
        }
        return value;
    }

    private getFundNameAndValue(element: Element): Partial<IFundDetail> {
        const heading = element.innerHTML.trim();

        // Special check for avoiding spans containing <a> elements with the integer part of the value we're looking for
        const children = element.getElementsByTagName('a');
        if (children.length > 0) {
            let pos = heading.length - 1;
            let decimals = heading.charAt(pos);
            while (this.isNumeric(decimals) && pos >= 0) {
                decimals = heading.charAt(--pos) + decimals;
            }
            const value = children[0].innerHTML + decimals.slice(1);
            const aPos = heading.indexOf('<');
            return {
                name: heading.slice(0, aPos).trim(),
                price: Number(value),
            };
        }

        let pos = heading.length - 1;
        let value = heading.charAt(pos);
        while (this.isNumeric(value) && pos >= 0) {
            value = heading.charAt(--pos) + value;
        }
        return {
            name: heading.slice(0, pos + 1).trim(),
            price: Number(heading.slice(pos + 1, heading.length)),
        };
    }

    private isNumeric(value: any) {
        if (value.slice(0, 1) === ' ') {
            return false;
        }
        var count = (value.match(/\./g) || []).length;
        if (count > 1) {
            return false;
        }
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
}

export const fundInfoService = new FundInfoService();
