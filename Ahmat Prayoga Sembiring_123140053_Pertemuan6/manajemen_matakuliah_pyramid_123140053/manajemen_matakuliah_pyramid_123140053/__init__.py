from pyramid.config import Configurator

def main(global_config, **settings):
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')

        config.add_static_view('static', 'static', cache_max_age=3600)

        config.scan()
    return config.make_wsgi_app()
