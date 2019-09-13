
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
        }	        
    ],
};

export default transforms;