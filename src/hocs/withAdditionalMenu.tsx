import { FC } from 'react';
import { AdditionalMenu } from '../components/AdditionalMenu/AdditionalMenu';

export const withAdditionalMenu = <T extends Record<string, unknown>>(Component: FC<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<>
				<Component {...props} />
				<AdditionalMenu />
			</>
		);
	};
};