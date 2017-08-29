# Nombre de décimal après la virgule, utile pour la précision des em
Sass::Script::Number.precision = 8

# Configuration des chemins des ressources:
sass_dir        = './src/css'
images_dir      = './src/assets/img'
javascripts_dir = './src/js'
fonts_dir       = './src/assets/fonts'
css_dir         = './build/css'

# Configuration des chemins HTTP
http_path             = ''
http_stylesheets_path = ''
http_images_path      = '../img'
http_javascripts_path = '../js'
http_fonts_path       = '../fonts'

# Configuration spécifique à chaque environement
if  environment == :production
    # options de sortie
    output_style = :compressed
else
    # options de sortie
    output_style =   :expanded
end


# Supprimer le hash générer par compass sur le nom des sprites
on_sprite_saved do |filename|
    if File.exists?(filename)
        FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
    end
end

# Remplacer les reférence au sprite avec hash dans la CSS par ceux sans hash
on_stylesheet_saved do |filename|
    if File.exists?(filename)
        css = File.read filename
        File.open(filename, 'w+') do |f|
            f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
        end
    end
end
