import * as React from 'react'

const content = [
    "<div class=\"root\"><span class=\"toprow\"> 238 SVT Text         Söndag 08 sep 2019\n </span><span class=\"W\">Källa: SIX          190905         1(3)</span>\n <span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"B bgY DH\">PPM AKTIEFONDER  A-B      </span><span class=\"R bgY DH\">SLUTKURSER</span>\n <span class=\"W\">            Va-   Fond-   Utv. sek i % </span>\n <span class=\"W\">            luta  kurs    1 dag    i år</span>\n <span class=\"G\">                                       </span>\n <span class=\"G\">Aberdeen Asset Management              </span>\n <span class=\"W\">American EquUSD    32.84 </span><span class=\"Y\">  0.36 </span><span class=\"Y\">  31.93</span>\n <span class=\"W\">- Japanese  JPY          </span><span class=\"W\">       </span><span class=\"W\">       </span>\n <span class=\"W\">- Japanese  JPY  1530.15 </span><span class=\"C\"> -0.48 </span><span class=\"Y\">  22.06</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Aktie-Ansvar                           </span>\n <span class=\"W\">Europa            130.22 </span><span class=\"C\"> -0.78 </span><span class=\"Y\">  14.91</span>\n <span class=\"W\">Sverige A         584.14 </span><span class=\"C\"> -0.17 </span><span class=\"Y\">   9.96</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Aktiespararna                          </span>\n <span class=\"W\">Direktavkastning  134.88 </span><span class=\"W\">       </span><span class=\"Y\">  18.93</span>\n <span class=\"W\">Topp Sv.           17.37 </span><span class=\"W\">       </span><span class=\"Y\">  16.89</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Alfred Berg Kapitalforvaltning         </span>\n <span class=\"W\">Aktiv       NOK  1610.71 </span><span class=\"C\"> -0.40 </span><span class=\"Y\">  14.19</span>\n <span class=\"W\">BestSelect  NOK          </span><span class=\"W\">       </span><span class=\"W\">       </span>\n <span class='added-line'>                                       </span>\n <span class=\"W\">Fastighet Nord.   <a href=\"/489\">489</a>.85 </span><span class=\"Y\">  0.14 </span><span class=\"Y\">  40.15</span>\n</div>",
    "<div class=\"root sub\"><span class=\"toprow\"> 238 SVT Text         Söndag 08 sep 2019\n </span><span class=\"W\">Källa: SIX          190905         2(3)</span>\n <span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"B bgY DH\">PPM AKTIEFONDER  A-B      </span><span class=\"R bgY DH\">SLUTKURSER</span>\n <span class=\"W\">            Va-   Fond-   Utv. sek i % </span>\n <span class=\"W\">            luta  kurs    1 dag    i år</span>\n <span class=\"G\">                                       </span>\n <span class=\"G\">Alfred Berg Kapitalforvaltning         </span>\n <span class=\"W\">Gambak      NOK 32010.02 </span><span class=\"C\"> -0.40 </span><span class=\"Y\">  18.43</span>\n <span class=\"W\">Berg Global NOK   542.06 </span><span class=\"W\">       </span><span class=\"Y\">  29.42</span>\n <span class=\"W\">Akt.Norge   NOK   991.38 </span><span class=\"C\"> -0.40 </span><span class=\"Y\">  15.23</span>\n <span class=\"W\">Ryssland          625.20 </span><span class=\"C\"> -0.30 </span><span class=\"Y\">  31.69</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Allianz Global Investors               </span>\n <span class=\"W\">Europe Equi EUR   271.00 </span><span class=\"C\"> -0.69 </span><span class=\"Y\">  28.29</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">AMF Fonder                             </span>\n <span class=\"W\">Asien SH          221.27 </span><span class=\"C\"> -0.28 </span><span class=\"Y\">  17.62</span>\n <span class=\"W\">Europa            214.30 </span><span class=\"C\"> -0.76 </span><span class=\"Y\">  20.54</span>\n <span class=\"W\">Global            196.96 </span><span class=\"C\"> -0.54 </span><span class=\"Y\">  25.75</span>\n <span class=\"W\">Nordamerika       297.27 </span><span class=\"C\"> -0.48 </span><span class=\"Y\">  31.21</span>\n <span class=\"W\">Småbolag          720.62 </span><span class=\"C\"> -0.04 </span><span class=\"Y\">  23.87</span>\n <span class=\"W\">Sverige           604.39 </span><span class=\"Y\">  0.04 </span><span class=\"Y\">  15.03</span>\n <span class='added-line'>                                       </span>\n <span class=\"W\">Världen           <a href=\"/417\">417</a>.13 </span><span class=\"C\"> -0.25 </span><span class=\"Y\">  18.90</span>\n</div>",
    "<div class=\"root sub\"><span class=\"toprow\"> 238 SVT Text         Söndag 08 sep 2019\n </span><span class=\"W\">Källa: SIX          190905         3(3)</span>\n <span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"B bgY DH\">PPM AKTIEFONDER  A-B      </span><span class=\"R bgY DH\">SLUTKURSER</span>\n <span class=\"W\">            Va-   Fond-   Utv. sek i % </span>\n <span class=\"W\">            luta  kurs    1 dag    i år</span>\n <span class=\"G\">                                       </span>\n <span class=\"G\">Amundi Funds                           </span>\n <span class=\"W\">Glb.GoldMineUSD    42.51 </span><span class=\"C\"> -0.73 </span><span class=\"Y\">  52.85</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Avanza Fonder                          </span>\n <span class=\"W\">ZERO              230.81 </span><span class=\"Y\">  0.28 </span><span class=\"Y\">  17.53</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Banque de Luxembourg                   </span>\n <span class=\"W\">America     USD  8602.01 </span><span class=\"C\"> -0.73 </span><span class=\"Y\">  37.24</span>\n <span class=\"W\">Europe      EUR  8006.08 </span><span class=\"C\"> -0.69 </span><span class=\"Y\">  25.79</span>\n <span class=\"W\">Global Eq   EUR   944.73 </span><span class=\"C\"> -0.69 </span><span class=\"Y\">  25.57</span>\n <span class=\"W\">Horizon     EUR  1252.86 </span><span class=\"C\"> -0.69 </span><span class=\"Y\">  25.88</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">BlackRock                              </span>\n <span class=\"W\">EmergEurop  EUR   110.94 </span><span class=\"C\"> -0.44 </span><span class=\"Y\">  27.25</span>\n <span class=\"W\">Emerg Mkts  USD    36.10 </span><span class=\"C\"> -0.37 </span><span class=\"Y\">  20.87</span>\n <span class=\"W\">EuroMarket  EUR    29.22 </span><span class=\"C\"> -0.42 </span><span class=\"Y\">  25.54</span>\n <span class='added-line'>                                       </span>\n <span class=\"W\">European Va EUR    61.51 </span><span class=\"C\"> -0.66 </span><span class=\"Y\">  16.17</span>\n</div>"
]
interface IFundInfo {
    company: string | null
    funds: IFundDetail[];
}

interface IFundDetail {
    name: string;
    currentValue: string
    dailyPercentage: string
    yearlyPercentage: string
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
    public currentValue: string
    public dailyPercentage: string
    public yearlyPercentage: string

    constructor(name: string, currentValue: string) {
        this.name = name
        this.currentValue = currentValue
        this.dailyPercentage = ''
        this.yearlyPercentage = ''
        
    }
}


export class Test extends React.Component {
    private allFunds: IFundInfo[] = [];

    constructor(props: any) {
        super(props);
        const document = new Document();
        const topElement: HTMLElement = document.createElement('rootEl');
        topElement.insertAdjacentHTML("afterbegin",content[0]);
        document.appendChild(topElement)

        const root = document.getElementsByClassName("root")[0]

        console.log(document)

        let fundInfo = new FundInfo('');
        for (let index = 0; index < root.childElementCount; index++) {
            const element = root.children[index];
            if (element.className === "G" && element.innerHTML.trim() !== '') {
                if (fundInfo.funds.length > 0) {
                    this.allFunds.push(fundInfo)
                }
                fundInfo = new FundInfo(element.innerHTML.trim())
            }
            if (fundInfo.company && element.className === "W" && element.innerHTML.trim() !== '') {
                const fundDetail = this.getFundDetails([root.children[index], root.children[index+1],root.children[index+2]])
                if (fundDetail) {
                    fundInfo.funds.push(fundDetail);
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
                    fund.dailyPercentage = element.innerHTML.trim()    
                } else {
                    fund.yearlyPercentage = element.innerHTML.trim()
                }
             }
        }
        return fund.yearlyPercentage ? fund : null
    }

    private getFundNameAndValue (heading: string): Partial<IFundDetail> {
        let readChar = 'X';
        let pos = heading.length
        while (readChar !== ' ') {
            readChar = heading.charAt(pos);
            pos-- 
        } 
        return {
            name: heading.slice(0,pos).trim(),
            currentValue: heading.slice(pos+2, heading.length)
        }
    }

}