from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
from ..models.matakuliah import Matakuliah


@view_config(route_name='mk_list', renderer='json', request_method='GET')
def get_all_matakuliah(request):
    db = request.dbsession
    data = db.query(Matakuliah).all()
    return [mk.to_dict() for mk in data]


@view_config(route_name='mk_detail', renderer='json', request_method='GET')
def get_matakuliah(request):
    db = request.dbsession
    mk_id = request.matchdict['id']
    mk = db.query(Matakuliah).get(mk_id)

    if not mk:
        return Response(json_body={'error': 'Matakuliah tidak ditemukan'}, status=404)

    return mk.to_dict()


@view_config(route_name='mk_list', renderer='json', request_method='POST')
def create_matakuliah(request):
    db = request.dbsession
    body = request.json_body

    mk = Matakuliah(
        kode_mk=body.get('kode_mk'),
        nama_mk=body.get('nama_mk'),
        sks=body.get('sks'),
        semester=body.get('semester')
    )

    db.add(mk)
    try:
        db.flush()
    except IntegrityError:
        return Response(json_body={'error': 'Kode MK sudah ada'}, status=400)

    return mk.to_dict()


@view_config(route_name='mk_detail', renderer='json', request_method='PUT')
def update_matakuliah(request):
    db = request.dbsession
    mk_id = request.matchdict['id']
    mk = db.query(Matakuliah).get(mk_id)

    if not mk:
        return Response(json_body={'error': 'Matakuliah tidak ditemukan'}, status=404)

    body = request.json_body
    mk.kode_mk = body.get('kode_mk', mk.kode_mk)
    mk.nama_mk = body.get('nama_mk', mk.nama_mk)
    mk.sks = body.get('sks', mk.sks)
    mk.semester = body.get('semester', mk.semester)

    try:
        db.flush()
    except IntegrityError:
        return Response(json_body={'error': 'Kode MK sudah ada'}, status=400)

    return mk.to_dict()


@view_config(route_name='mk_detail', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    db = request.dbsession
    mk_id = request.matchdict['id']
    mk = db.query(Matakuliah).get(mk_id)

    if not mk:
        return Response(json_body={'error': 'Matakuliah tidak ditemukan'}, status=404)

    db.delete(mk)
    db.flush()
    return {'message': 'Matakuliah berhasil dihapus'}
