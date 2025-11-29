def includeme(config):
    config.add_route('mk_list', '/api/matakuliah')
    config.add_route('mk_detail', '/api/matakuliah/{id}')
