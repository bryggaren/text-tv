import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { IFundInfo } from './models';
import { Main } from './Main';
import MenuAppBar from './components/MenuAppBar';
import Container from '@material-ui/core/Container';
import { fundInfoService } from './services';

interface IAppLoaderState {
    allFunds: IFundInfo[];
}

export class AppLoader extends React.Component<{}, IAppLoaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            allFunds: [],
        };
    }

    public async componentDidMount() {
        this.setState({ allFunds: await fundInfoService.getFundInfo() });
    }

    public render() {
        return (
            <MemoryRouter>
                <MenuAppBar />
                <Container style={{ marginTop: 56 }}>
                    {this.state.allFunds.length > 0 && <Main funds={this.state.allFunds} />}
                </Container>
            </MemoryRouter>
        );
    }
}
