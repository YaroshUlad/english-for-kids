import React from 'react';
import {IconButton, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useAppSelector} from '../../../app/store';
import {Link} from 'react-router-dom';

export const MenuBurger = () => {
	const categories = useAppSelector(state => state.categories.categories);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<MenuIcon/>
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleClose}>
					<Link to={'/'}>
						Main
					</Link>
				</MenuItem>
				{categories.map(el => {
					return (
						<MenuItem key={el.id} onClick={handleClose}>
							<Link to={`/cards/${el.id}`}>
								{el.name}
							</Link>
						</MenuItem>
					);
				})}
			</Menu>
		</div>
	);
};