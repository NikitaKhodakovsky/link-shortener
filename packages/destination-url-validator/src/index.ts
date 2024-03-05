import { isURL, ValidationOptions, registerDecorator } from 'class-validator'

export function isDestinationURL(value: any) {
	return isURL(value, { protocols: ['http', 'https'], require_tld: true, require_host: true, require_protocol: true })
}

export function IsDestinationURL(options?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isDestinationURL',
			target: object.constructor,
			constraints: ['isDestinationURL'],
			propertyName,
			options,
			validator: {
				validate: (value: any) => isDestinationURL(value),
				defaultMessage: () => 'Destination URL should consist of protocol, host and tld'
			}
		})
	}
}
