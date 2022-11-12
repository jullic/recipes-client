import React, { ChangeEvent, FC, useState } from 'react';
import classNames from 'classnames';
import { ISearchInputProps } from './SearchInput.props';
import styles from './SearchInput.module.css';

export const SearchInput: FC<ISearchInputProps> = ({ className, ...props }) => {
	const [searchValue, setSearchValue] = useState('');

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	}

	const onClearHandler = () => {
		setSearchValue('');
	}

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.wrapper}>
				<input className={styles.input} onChange={onChangeHandler} type="text" value={searchValue} />
				{searchValue !== '' && <button onClick={onClearHandler} className={styles.btn}>&times;</button>}
			</div>
		</div>

	);

}