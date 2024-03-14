import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.subtitle1,
  height: 50,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.primary,
  borderRadius: 50,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

function NavItem({ item, active }) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
    bgcolor: "action.active",
    '&:hover': {
      bgcolor: 'action.selected',
    },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  return (
    <ListItemStyle
      // component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      {/* <ListItemIconStyle>{icon && icon}</ListItemIconStyle> */}
      <ListItemText disableTypography primary={title} sx={{px:"20px"}} />
    </ListItemStyle>
  );
}

export default function NavSection({ navConfig, ...other }) {
  const pathname = usePathname()

  const match = (path) => (path ? path === pathname : false);

  return (
    <Box {...other}>
      <List sx={{pt: "25px" }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
