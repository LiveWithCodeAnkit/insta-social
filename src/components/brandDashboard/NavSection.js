import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
  const [isActive, setIsActive] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleLink = () => {
    setIsActive(true)
  }

  const activeRootStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
    bgcolor: "action.active",
    '&:hover': {
      bgcolor: 'action.selected',
    },
    height: 50,
    py: '10px',
    textTransform: 'capitalize',
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  return (
    <Box
      sx={{
        height: 50,
        py: '10px',
        textTransform: 'capitalize',
        // color: "text.primary",
        cursor: 'pointer',
        borderRadius: 50,
        ...(isActiveRoot && activeRootStyle),
        '&:hover': {
          bgcolor: !isActiveRoot && 'action.hover',
        },
      }}
    // onClick={handleLink}
    >
      <Link
        // component={RouterLink}
        href={path}
        style={{
          textDecoration: 'none',
          ...(isActiveRoot && activeRootStyle),
          // ...(isActiveRoot),
          // color: 'text.primary',
          // fontWeight: 'fontWeightMedium',
          // bgcolor: "action.active",
          // '&:hover': {
          //   bgcolor: 'action.selected',
          // },
          // height: 50,
          // py: '10px',
          // textTransform: 'capitalize',
        }}
      >
        {/* <ListItemIconStyle>{icon && icon}</ListItemIconStyle> */}
        <ListItemText disableTypography primary={title} sx={{ px: "20px", color: 'text.primary', fontWeight: 'fontWeightMedium' }} />
      </Link>
    </Box>
  );
}

export default function NavSection({ navConfig, ...other }) {
  const pathname = usePathname()

  const match = (path) => (path ? path === pathname : false);

  return (
    <Box {...other}>
      <List sx={{ pt: "25px" }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
