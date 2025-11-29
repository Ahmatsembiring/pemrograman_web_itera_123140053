import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """
    Menambahkan data awal (seed) untuk tabel Matakuliah.
    """

    # Contoh data awal
    seed_data = [
        {
            "kode_mk": "IF101",
            "nama_mk": "Pengantar Informatika",
            "sks": 3,
            "semester": 1
        },
        {
            "kode_mk": "IF201",
            "nama_mk": "Struktur Data",
            "sks": 3,
            "semester": 3
        },
        {
            "kode_mk": "IF301",
            "nama_mk": "Basis Data",
            "sks": 4,
            "semester": 3
        }
    ]

    for item in seed_data:
        existing = dbsession.query(models.Matakuliah).filter_by(kode_mk=item["kode_mk"]).first()
        if not existing:
            mk = models.Matakuliah(
                kode_mk=item["kode_mk"],
                nama_mk=item["nama_mk"],
                sks=item["sks"],
                semester=item["semester"],
            )
            dbsession.add(mk)
            print(f"Matakuliah {item['kode_mk']} ditambahkan.")
        else:
            print(f"Matakuliah {item['kode_mk']} sudah ada.")


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)

    env = bootstrap(args.config_uri)
    request = env['request']

    try:
        with request.tm:
            dbsession = request.dbsession
            setup_models(dbsession)
        print("\nDatabase berhasil di-initialize!\n")

    except OperationalError:
        print("""
ERROR: Tidak dapat terhubung ke database.

Pastikan:
- Database hidup
- Connection string di development.ini benar
""")

    finally:
        env['closer']()


if __name__ == '__main__':
    main()
