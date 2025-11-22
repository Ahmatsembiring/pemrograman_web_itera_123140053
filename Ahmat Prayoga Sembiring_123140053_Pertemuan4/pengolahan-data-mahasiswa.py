# Program Pengelolaan Data Nilai Mahasiswa

# ------------------ DATA AWAL ------------------ #
mahasiswa_list = [
    {"nama": "Andi",   "nim": "123140001", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 75},
    {"nama": "Budi",   "nim": "123140002", "nilai_uts": 70, "nilai_uas": 78, "nilai_tugas": 82},
    {"nama": "Cici",   "nim": "123140003", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Dewi",   "nim": "123140004", "nilai_uts": 90, "nilai_uas": 88, "nilai_tugas": 92},
    {"nama": "Eko",    "nim": "123140005", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 58},
    {"nama": "Fajar",    "nim": "123140006", "nilai_uts": 75, "nilai_uas": 72, "nilai_tugas": 78},
    {"nama": "Gina",     "nim": "123140007", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Heri",     "nim": "123140008", "nilai_uts": 65, "nilai_uas": 60, "nilai_tugas": 62},
    {"nama": "Intan",    "nim": "123140009", "nilai_uts": 95, "nilai_uas": 92, "nilai_tugas": 94},
    {"nama": "Joko",     "nim": "123140010", "nilai_uts": 45, "nilai_uas": 48, "nilai_tugas": 50},
]

# ------------------ FUNGSI PERHITUNGAN ------------------ #
def hitung_nilai_akhir(mhs):
    """Menghitung nilai akhir: 30% UTS + 40% UAS + 30% Tugas"""
    return (
        0.3 * mhs["nilai_uts"] +
        0.4 * mhs["nilai_uas"] +
        0.3 * mhs["nilai_tugas"]
    )

def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir"""
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

# ------------------ FUNGSI TAMPIL TABEL ------------------ #
def tampilkan_tabel(data):
    """Menampilkan data mahasiswa dalam bentuk tabel"""
    if not data:
        print("Belum ada data mahasiswa.")
        return

    # Header
    header = f"{'No':<4}{'NIM':<12}{'Nama':<15}{'UTS':>8}{'UAS':>8}{'Tugas':>8}{'Akhir':>10}{'Grade':>8}"
    garis  = "-" * len(header)
    print(header)
    print(garis)

    # Isi
    for i, mhs in enumerate(data, start=1):
        na = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(na)
        print(
            f"{i:<4}"
            f"{mhs['nim']:<12}"
            f"{mhs['nama']:<15}"
            f"{mhs['nilai_uts']:>8.2f}"
            f"{mhs['nilai_uas']:>8.2f}"
            f"{mhs['nilai_tugas']:>8.2f}"
            f"{na:>10.2f}"
            f"{grade:>8}"
        )

# ------------------ FUNGSI CARI TERTINGGI / TERENDAH ------------------ #
def cari_nilai_tertinggi(data):
    if not data:
        return None
    return max(data, key=hitung_nilai_akhir)

def cari_nilai_terendah(data):
    if not data:
        return None
    return min(data, key=hitung_nilai_akhir)

# ------------------ FUNGSI INPUT MAHASISWA BARU ------------------ #
def input_mahasiswa_baru(data):
    print("\n=== Input Data Mahasiswa Baru ===")
    nama = input("Nama        : ")
    nim  = input("NIM         : ")
    try:
        uts   = float(input("Nilai UTS   : "))
        uas   = float(input("Nilai UAS   : "))
        tugas = float(input("Nilai Tugas : "))
    except ValueError:
        print("Input nilai harus berupa angka! Data batal disimpan.")
        return

    mhs_baru = {
        "nama": nama,
        "nim": nim,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    }
    data.append(mhs_baru)
    print("Data mahasiswa baru berhasil ditambahkan.\n")

# ------------------ FUNGSI FILTER BERDASARKAN GRADE ------------------ #
def filter_berdasarkan_grade(data, grade_target):
    grade_target = grade_target.upper()
    hasil = []
    for mhs in data:
        na = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(na)
        if grade == grade_target:
            hasil.append(mhs)
    return hasil

# ------------------ FUNGSI RATA-RATA KELAS ------------------ #
def hitung_rata_rata_kelas(data):
    if not data:
        return 0
    total = sum(hitung_nilai_akhir(mhs) for mhs in data)
    return total / len(data)

# ------------------ MENU UTAMA ------------------ #
def main():
    while True:
        print("\n===== MENU PENGELOLAAN NILAI MAHASISWA =====")
        print("1. Tampilkan semua data mahasiswa")
        print("2. Input data mahasiswa baru")
        print("3. Tampilkan mahasiswa dengan nilai tertinggi")
        print("4. Tampilkan mahasiswa dengan nilai terendah")
        print("5. Filter mahasiswa berdasarkan grade")
        print("6. Hitung rata-rata nilai kelas")
        print("0. Keluar")
        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            print("\n=== DATA NILAI MAHASISWA ===")
            tampilkan_tabel(mahasiswa_list)

        elif pilihan == "2":
            input_mahasiswa_baru(mahasiswa_list)

        elif pilihan == "3":
            mhs = cari_nilai_tertinggi(mahasiswa_list)
            if mhs is None:
                print("Belum ada data.")
            else:
                na = hitung_nilai_akhir(mhs)
                grade = tentukan_grade(na)
                print("\n=== MAHASISWA DENGAN NILAI TERTINGGI ===")
                print(f"Nama   : {mhs['nama']}")
                print(f"NIM    : {mhs['nim']}")
                print(f"UTS    : {mhs['nilai_uts']}")
                print(f"UAS    : {mhs['nilai_uas']}")
                print(f"Tugas  : {mhs['nilai_tugas']}")
                print(f"Akhir  : {na:.2f}")
                print(f"Grade  : {grade}")

        elif pilihan == "4":
            mhs = cari_nilai_terendah(mahasiswa_list)
            if mhs is None:
                print("Belum ada data.")
            else:
                na = hitung_nilai_akhir(mhs)
                grade = tentukan_grade(na)
                print("\n=== MAHASISWA DENGAN NILAI TERENDAH ===")
                print(f"Nama   : {mhs['nama']}")
                print(f"NIM    : {mhs['nim']}")
                print(f"UTS    : {mhs['nilai_uts']}")
                print(f"UAS    : {mhs['nilai_uas']}")
                print(f"Tugas  : {mhs['nilai_tugas']}")
                print(f"Akhir  : {na:.2f}")
                print(f"Grade  : {grade}")

        elif pilihan == "5":
            grade_target = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
            hasil = filter_berdasarkan_grade(mahasiswa_list, grade_target)
            print(f"\n=== MAHASISWA DENGAN GRADE {grade_target} ===")
            tampilkan_tabel(hasil)

        elif pilihan == "6":
            rata = hitung_rata_rata_kelas(mahasiswa_list)
            print(f"\nRata-rata nilai akhir kelas: {rata:.2f}")

        elif pilihan == "0":
            print("Terima kasih, program selesai.")
            break

        else:
            print("Pilihan tidak valid, silakan coba lagi.")

# Jalankan program
if __name__ == "__main__":
    main()
