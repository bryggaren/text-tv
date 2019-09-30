import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocalAtm from '@material-ui/icons/LocalAtm';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { IFundInfo } from '../models';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
      color: 'green',
      '&:hover': {
        color: 'darkgreen',
      }
    }
  }),
);

export interface IFundPickerProps {
  allFunds: IFundInfo[];
  onAdd(company: string, fundName: string): void;
}

export const FundPicker: React.FunctionComponent<IFundPickerProps> = ({ allFunds, onAdd }) => {
  const classes = useStyles();
  const [selectedCompany, setSelectedCompany] = React.useState('');
  const [hoveredFund, setHoveredFund] = React.useState('');

  const handleClick = (company: string) => {
    if (selectedCompany === company) {
      setSelectedCompany('')
    } else {
      setSelectedCompany(company);
    }
  };

  const updateHoveredFund = (name: string) => {
    setHoveredFund(name);
  }

  const resetHoveredFund = () => {
    setHoveredFund('')
  }

  // const sortByKey = (a: JSX.Element, b: JSX.Element) => {
  //   console.log('sorting');
  //   var x = a.key ? a.key.toString().toLowerCase() : 0;
  //   var y = b.key ? b.key.toString().toLowerCase() : 0;
  //   if (x < y) { return -1; }
  //   if (x > y) { return 1; }
  //   return 0;
  // }

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
      {allFunds.map((fundInfo: IFundInfo) => {
        console.log('render')
        return (
          <div key={fundInfo.company}>
            <ListItem button onClick={() => handleClick(fundInfo.company)}>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={fundInfo.company} />
              {selectedCompany === fundInfo.company ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {fundInfo.funds.map((fund) => {
              return (
                <Collapse key={fund.name} in={selectedCompany === fundInfo.company} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button onMouseEnter={() => updateHoveredFund(fund.name)} onMouseLeave={resetHoveredFund} className={classes.nested}>
                      <ListItemIcon>
                        <LocalAtm />
                      </ListItemIcon>
                      <ListItemText primary={fund.name} />

                      <Button style={{ display: hoveredFund === fund.name ? 'flex' : 'none' }} onClick={() => onAdd(fundInfo.company, fund.name)}>Välj</Button>

                    </ListItem>
                  </List>
                </Collapse>
              )
            })}

          </div>
        )
      })}
    </List>
  );
}
