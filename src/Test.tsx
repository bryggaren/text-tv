import * as React from 'react'
import * as data from './fonderMock.json';

interface IFundInfo {
    company: string | null
    funds: IFundDetail[];
}

interface IFundDetail {
    name: string;
    currentValue: number
    dailyPercentage: number
    yearlyPercentage: number
}

class FundInfo implements IFundInfo {
    public company: string
    public funds: IFundDetail[];
    constructor(company: string) {
        this.company= company
        this.funds= []
    }
}

class FundDetail implements IFundDetail {
    public name: string;
    public currentValue: number
    public dailyPercentage: number
    public yearlyPercentage: number

    constructor(name: string, currentValue: number) {
        this.name = name
        this.currentValue = currentValue
        this.dailyPercentage = 0
        this.yearlyPercentage = 0

    }
}


export class Test extends React.Component {
    private allFunds: IFundInfo[] = [];

    constructor(props: any) {
        super(props);
        const document = new Document();
        const topElement: HTMLElement = document.createElement('rootEl');

        const jsonData = JSON.stringify(data)
        const fundData = JSON.parse(jsonData)
        const pages = fundData.default;
        const allContent = []
        for (let index = 0; index < pages.length; index++) {
            allContent.push(pages[index].content);
        }

        for (let index = 0; index < allContent.length; index++) {
            const element = allContent[index];
            topElement.insertAdjacentHTML("afterbegin",element);
        }
        document.appendChild(topElement)

        const rootElements = document.getElementsByClassName("root")


        for (let index = 0; index < rootElements.length; index++) {
            const root = rootElements[index];

            let fundInfo = new FundInfo('');
            for (let j = 0; j < root.childElementCount; j++) {
                const element = root.children[j];
                if (element.className === "G" && element.innerHTML.trim() !== '') {
                    if (fundInfo.funds.length > 0) {
                        this.allFunds.push(fundInfo)
                    }
                    fundInfo = new FundInfo(element.innerHTML.trim())
                }
                if (fundInfo.company && element.className === "W" && element.innerHTML.trim() !== '') {
                    const fundDetail = this.getFundDetails([root.children[j], root.children[j+1],root.children[j+2]])
                    if (fundDetail) {
                        fundInfo.funds.push(fundDetail);
                    }
                }
            }

        }

        console.log(this.allFunds)
    }

    public render() {
        return (
            <div />
        )
    }

    private getFundDetails(elements: Element[]): IFundDetail | null {
        const fundHeading = this.getFundNameAndValue(elements[0].innerHTML.trim());
        const fund = new FundDetail(fundHeading.name!, fundHeading.currentValue!);

        for (let index = elements.length -1 ; index > 0; index--) {
            const element = elements[index];
            if (element.className === "C" || element.className === "Y") {
                if (fund.yearlyPercentage) {
                    fund.dailyPercentage = Number(element.innerHTML.trim())
                } else {
                    fund.yearlyPercentage = Number(element.innerHTML.trim())
                }
             }
        }
        return fund.yearlyPercentage ? fund : null
    }

    private getFundNameAndValue (heading: string): Partial<IFundDetail> {
        let readChar = 'X';
        let pos = heading.length
        while (readChar !== ' ' && pos !== 0) {
            readChar = heading.charAt(pos);
            pos--
        }
        return {
            name: heading.slice(0,pos).trim(),
            currentValue: Number(heading.slice(pos+2, heading.length))
        }
    }

}