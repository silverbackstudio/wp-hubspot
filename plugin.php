<?php
/**
 * Plugin Name: Hubspot by SVBK
 * Plugin URI: https://github.com/silverbackstudio/wp-hubspot
 * Description: Embed Hubspot Forms
 * Author: Silverback Studio
 * Author URI: https://www.silverbackstudio.it
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Enqueue scripts and styles.
 */
function svbk_hubspot_scripts() {

	wp_enqueue_script(
		'hubspot-forms-shell',
		'//js.hsforms.net/forms/shell.js', 
		null, 
		true 
	);	
	
	wp_enqueue_script(
		'svbk-hubspot',
		plugins_url( '/src/forms.js', __FILE__ ), 
		array( 'jquery', 'hubspot-forms-shell' ),
		null, 
		true 
	);

    $theme_support = get_theme_support( 'hubspot-forms' );
    
    if ( is_array($theme_support) && !empty( $theme_support[0] ) && !empty( $theme_support[0]['style'] )  ) {
         wp_localize_script( 'svbk-hubspot', 'hubspotFormThemeCss', apply_filters( 'svbk_hubspot_form_theme_css', $theme_support[0]['style']) );
    }

}
add_action( 'wp_enqueue_scripts', 'svbk_hubspot_scripts' );