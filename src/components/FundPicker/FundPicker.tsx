import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { IFundInfo } from '../../models';
import { FundInfoItem } from './FundInfoItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export interface IFundPickerProps {
  allFunds: IFundInfo[];
  onAddFund(company: string, fundName: string): void;
}

export const FundPicker: React.FunctionComponent<IFundPickerProps> = ({ allFunds, onAddFund }) => {
  const classes = useStyles();
  // const [selectedCompany, setSelectedCompany] = React.useState('');


  // const handleClick = (company: string) => {
  //   if (selectedCompany === company) {
  //     setSelectedCompany('')
  //   } else {
  //     setSelectedCompany(company);
  //   }
  // };


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Välj fond
        </ListSubheader>
      }
      className={classes.root}
    >
      {allFunds.map((fundInfo: IFundInfo, index) => {
        console.log('render')
        return (
          <FundInfoItem key={index} fundInfo={fundInfo} onAddFund={onAddFund} />
        )
      })}
    </List>
  );
}
