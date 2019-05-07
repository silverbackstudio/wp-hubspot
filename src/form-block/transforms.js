
/**
 * WordPress dependencies
 */
const { 
	createBlock
} = wp.blocks; 

const transforms = {
    from: [
        {
            type: 'shortcode',
            tag: 'hubspot',
            attributes: {
                // An attribute can be source from the shortcode attributes
                portalId: {
                    type: 'string',
                    shortcode: ( { named: { portal = '' } } ) => portal,
                },
                // An attribute can be source from the shortcode attributes
                formId: {
                    type: 'string',
                    shortcode: ( { named: { id = '' } } ) => id,
                },
            },
        },
		{
			type: 'raw',
			selector: 'div',
			schema: {
				div: { attributes: [ 'data-portal-id', 'data-form-id' ] },
			},
			//isMatch: ( node ) => node.dataset && node.dataset.block === 'hubspot/form',
			transform( node ) {
				
				const { portalId, formId } = node.dataset;
				const attrs = {};

				if ( portalId ) {
					attrs.portalId = portalId;
				}
				
				if ( formId ) {
					attrs.formId = formId;
				}
				
				return createBlock( 'hubspot/form', attrs );
			},
		},	        
		// {
		// 	type: 'raw',
		// 	schema: {
		// 		script: { 
		// 			attributes: [ 'charset', 'src' ],
		// 			allowEmpty: true,
		// 		},
		// 		script: { 
		// 			children: {
		// 				'#text': {},
		// 			},
		// 		},
		// 	},
		// 	//isMatch: ( node ) => node.dataset && node.dataset.block === 'hubspot/form',
		// 	transform( node ) {
				
		// 		console.log( 'HS FORM EMBED TRANSFORM', node );
				
		// 		const { portalId, formId } = node.dataset;
		// 		const attrs = {};

		// 		// if ( portalId ) {
		// 		// 	attrs.portalId = portalId;
		// 		// }
				
		// 		// if ( formId ) {
		// 		// 	attrs.formId = formId;
		// 		// }
				
		// 		return createBlock( 'hubspot/form', attrs );
		// 	},
		// },	        
    ],
};

export default transforms;