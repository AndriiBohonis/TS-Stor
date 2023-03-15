import React from "react"

import s from './Footer.module.scss'

export const Footer = () => {

	return (
		<footer className={s.container}>
			<div className={s.text}>
				Copyright © 2023. Privacy Policy.
			</div>
		</footer>
	)
}
