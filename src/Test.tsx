import * as React from 'react'


const content = [
    "<div class=\"root\"><span class=\"toprow\"> 238 SVT Text         Fredag 06 sep 2019\n </span><span class=\"W\">Källa: SIX          190905         1(3)</span>\n <span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"B bgY DH\">PPM AKTIEFONDER  A-B      </span><span class=\"R bgY DH\">SLUTKURSER</span>\n <span class=\"W\">            Va-   Fond-   Utv. sek i % </span>\n <span class=\"W\">            luta  kurs    1 dag    i år</span>\n <span class=\"G\">                                       </span>\n <span class=\"G\">Aberdeen Asset Management              </span>\n <span class=\"W\">American EquUSD    32.48 </span><span class=\"Y\">  0.29 </span><span class=\"Y\">  31.46</span>\n <span class=\"W\">- Japanese  JPY          </span><span class=\"W\">       </span><span class=\"W\">       </span>\n <span class=\"W\">- Japanese  JPY  1530.29 </span><span class=\"Y\">  0.59 </span><span class=\"Y\">  22.65</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Aktie-Ansvar                           </span>\n <span class=\"W\">Europa            131.25 </span><span class=\"Y\">  0.13 </span><span class=\"Y\">  15.82</span>\n <span class=\"W\">Sverige A         585.15 </span><span class=\"Y\">  1.10 </span><span class=\"Y\">  10.15</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Aktiespararna                          </span>\n <span class=\"W\">Direktavkastning  133.98 </span><span class=\"W\">       </span><span class=\"Y\">  18.14</span>\n <span class=\"W\">Topp Sv.           17.19 </span><span class=\"W\">       </span><span class=\"Y\">  15.68</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Alfred Berg Kapitalforvaltning         </span>\n <span class=\"W\">Aktiv       NOK  1591.41 </span><span class=\"C\"> -0.20 </span><span class=\"Y\">  13.05</span>\n <span class=\"W\">BestSelect  NOK          </span><span class=\"W\">       </span><span class=\"W\">       </span>\n <span class='added-line'>                                       </span>\n <span class=\"W\">Fastighet Nord.   <a href=\"/489\">489</a>.17 </span><span class=\"C\"> -3.60 </span><span class=\"Y\">  39.96</span>\n</div>",
    "<div class=\"root sub\"><span class=\"toprow\"> 238 SVT Text         Fredag 06 sep 2019\n </span><span class=\"W\">Källa: SIX          190905         2(3)</span>\n <span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"B bgY DH\">PPM AKTIEFONDER  A-B      </span><span class=\"R bgY DH\">SLUTKURSER</span>\n <span class=\"W\">            Va-   Fond-   Utv. sek i % </span>\n <span class=\"W\">            luta  kurs    1 dag    i år</span>\n <span class=\"G\">                                       </span>\n <span class=\"G\">Alfred Berg Kapitalforvaltning         </span>\n <span class=\"W\">Gambak      NOK 31758.02 </span><span class=\"C\"> -0.20 </span><span class=\"Y\">  17.73</span>\n <span class=\"W\">Berg Global NOK   542.06 </span><span class=\"W\">       </span><span class=\"Y\">  29.42</span>\n <span class=\"W\">Akt.Norge   NOK   977.07 </span><span class=\"C\"> -0.20 </span><span class=\"Y\">  13.79</span>\n <span class=\"W\">Ryssland          627.07 </span><span class=\"C\"> -0.50 </span><span class=\"Y\">  32.09</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Allianz Global Investors               </span>\n <span class=\"W\">Europe Equi EUR   269.00 </span><span class=\"C\"> -0.47 </span><span class=\"Y\">  27.95</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">AMF Fonder                             </span>\n <span class=\"W\">Asien SH          221.90 </span><span class=\"C\"> -0.16 </span><span class=\"Y\">  17.96</span>\n <span class=\"W\">Europa            215.95 </span><span class=\"Y\">  0.02 </span><span class=\"Y\">  21.47</span>\n <span class=\"W\">Global            198.02 </span><span class=\"Y\">  0.14 </span><span class=\"Y\">  26.42</span>\n <span class=\"W\">Nordamerika       298.70 </span><span class=\"Y\">  0.40 </span><span class=\"Y\">  31.84</span>\n <span class=\"W\">Småbolag          720.90 </span><span class=\"C\"> -0.52 </span><span class=\"Y\">  23.92</span>\n <span class=\"W\">Sverige           604.15 </span><span class=\"Y\">  0.42 </span><span class=\"Y\">  14.99</span>\n <span class='added-line'>                                       </span>\n <span class=\"W\">Världen           <a href=\"/418\">418</a>.16 </span><span class=\"Y\">  0.31 </span><span class=\"Y\">  19.19</span>\n</div>",
    "<div class=\"root sub\"><span class=\"toprow\"> 238 SVT Text         Fredag 06 sep 2019\n </span><span class=\"W\">Källa: SIX          190905         3(3)</span>\n <span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"Y bgY DH\"> </span><span class=\"B bgY DH\">PPM AKTIEFONDER  A-B      </span><span class=\"R bgY DH\">SLUTKURSER</span>\n <span class=\"W\">            Va-   Fond-   Utv. sek i % </span>\n <span class=\"W\">            luta  kurs    1 dag    i år</span>\n <span class=\"G\">                                       </span>\n <span class=\"G\">Amundi Funds                           </span>\n <span class=\"W\">Glb.GoldMineUSD    44.30 </span><span class=\"C\"> -0.60 </span><span class=\"Y\">  60.25</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Avanza Fonder                          </span>\n <span class=\"W\">ZERO              230.16 </span><span class=\"Y\">  1.01 </span><span class=\"Y\">  17.20</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">Banque de Luxembourg                   </span>\n <span class=\"W\">America     USD  8479.51 </span><span class=\"C\"> -0.60 </span><span class=\"Y\">  36.10</span>\n <span class=\"W\">Europe      EUR  8009.48 </span><span class=\"C\"> -0.47 </span><span class=\"Y\">  26.44</span>\n <span class=\"W\">Global Eq   EUR   940.64 </span><span class=\"C\"> -0.47 </span><span class=\"Y\">  25.63</span>\n <span class=\"W\">Horizon     EUR  1255.91 </span><span class=\"C\"> -0.47 </span><span class=\"Y\">  26.79</span>\n <span class=\"W\">                                       </span>\n <span class=\"G\">BlackRock                              </span>\n <span class=\"W\">EmergEurop  EUR   110.66 </span><span class=\"Y\">  0.02 </span><span class=\"Y\">  27.81</span>\n <span class=\"W\">Emerg Mkts  USD    35.97 </span><span class=\"Y\">  0.57 </span><span class=\"Y\">  21.31</span>\n <span class=\"W\">EuroMarket  EUR    29.14 </span><span class=\"Y\">  0.60 </span><span class=\"Y\">  26.07</span>\n <span class='added-line'>                                       </span>\n <span class=\"W\">European Va EUR    61.49 </span><span class=\"Y\">  0.39 </span><span class=\"Y\">  16.94</span>\n</div>"
]

interface IFundInfo {
    company: string | null
    funds: (string | null)[];
}

class FundInfo implements IFundInfo {
    public company: string | null
    public funds: (string | null)[];
    constructor() {
        this.company= null;
        this.funds= []
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

        let fundInfo = new FundInfo();
        for (let index = 0; index < root.childElementCount; index++) {
            const element = root.children[index];
            if (element.className === "G") {
                if (fundInfo.company) {
                    this.allFunds.push(fundInfo)
                    fundInfo = new FundInfo();
                }
                fundInfo.company = element.innerHTML.trim()
            } else if (element.className ==="W") {
                fundInfo.funds.push(element.innerHTML.trim())
            }





        }
        console.log(this.allFunds)


    }

    public render() {
        return (
            <div />
        )
    }
}