import { Button, Menu, MenuItem, Stack, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import IconActions from "./IconActions";
// import Logo from "./Logo";

function DesktopMenu() {
	const [anchorEl, setAnchorEl] = useState(null as any)
	const open = Boolean(anchorEl)
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Stack direction='row' spacing={7}>
					<Link onClick={window.location.reload} to={'/'}>
						<Button
							color='info'
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}
						>
							ABG
						</Button>
					</Link>
					<Button color='inherit'>Categories</Button>

					<Button color='inherit'>Login</Button>
				</Stack>
				<Menu
					id='resources-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					MenuListProps={{
						'aria-labelledby': 'resources-button',
					}}
				>
					<MenuItem onClick={handleClose}>Blog</MenuItem>
					<MenuItem onClick={handleClose}>Podcast</MenuItem>
				</Menu>
			</Toolbar>
		</>
	)
}

export default DesktopMenu
