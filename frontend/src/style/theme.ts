import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', 
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#202127',
        }
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#acd268'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor:'#c5e07a'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor:'#3a4149'
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
        },
        title: {
          fontSize: '3rem',
          color: '#acd268'
        },
        subheader: {
          color: '#acd268'
        }
      }
    },
    MuiTablePaginationActions: {
      styleOverrides: {
        root: {
          color:'#acd268',
        }
      }
    }
  }
});

export default theme;
