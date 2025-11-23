from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Optional


class LibraryItem(ABC):
    """
    Abstract base class untuk semua item perpustakaan.
    Menerapkan konsep abstraksi dan enkapsulasi.
    """
    
    def __init__(self, item_id: str, title: str, author: str, year: int):
        """
        Inisialisasi atribut dasar library item.
        
        Args:
            item_id: ID unik untuk item
            title: Judul item
            author: Penulis/pembuat item
            year: Tahun terbit
        """
        self.__item_id = item_id  # Private attribute (encapsulation)
        self._title = title  # Protected attribute
        self._author = author
        self._year = year
        self._is_available = True  # Status ketersediaan
    
    # Property decorators untuk encapsulation
    @property
    def item_id(self) -> str:
        """Getter untuk item_id (read-only)"""
        return self.__item_id
    
    @property
    def title(self) -> str:
        """Getter untuk title"""
        return self._title
    
    @title.setter
    def title(self, value: str):
        """Setter untuk title dengan validasi"""
        if not value or len(value.strip()) == 0:
            raise ValueError("Judul tidak boleh kosong")
        self._title = value
    
    @property
    def is_available(self) -> bool:
        """Getter untuk status ketersediaan"""
        return self._is_available
    
    def borrow(self) -> bool:
        """
        Method untuk meminjam item.
        
        Returns:
            True jika berhasil, False jika item tidak tersedia
        """
        if self._is_available:
            self._is_available = False
            return True
        return False
    
    def return_item(self):
        """Method untuk mengembalikan item"""
        self._is_available = True
    
    @abstractmethod
    def display_info(self) -> str:
        """
        Abstract method yang harus diimplementasikan oleh subclass.
        Menampilkan informasi detail item.
        """
        pass
    
    @abstractmethod
    def get_item_type(self) -> str:
        """
        Abstract method untuk mendapatkan tipe item.
        Menerapkan polymorphism.
        """
        pass
    
    def __str__(self) -> str:
        """String representation untuk item"""
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"[{self.__item_id}] {self._title} - {status}"


class Book(LibraryItem):
    """
    Class untuk item buku yang mewarisi dari LibraryItem.
    Menerapkan inheritance dan polymorphism.
    """
    
    def __init__(self, item_id: str, title: str, author: str, year: int, 
                 isbn: str, pages: int, genre: str):
        """
        Inisialisasi objek Book.
        
        Args:
            item_id: ID unik buku
            title: Judul buku
            author: Penulis buku
            year: Tahun terbit
            isbn: ISBN buku
            pages: Jumlah halaman
            genre: Genre buku
        """
        super().__init__(item_id, title, author, year)
        self._isbn = isbn
        self._pages = pages
        self._genre = genre
    
    def display_info(self) -> str:
        """
        Implementasi method abstract untuk menampilkan info buku.
        Menerapkan polymorphism.
        """
        status = "✓ Tersedia" if self._is_available else "✗ Dipinjam"
        return f"""
{'='*50}
Tipe: BUKU
ID: {self.item_id}
Judul: {self._title}
Penulis: {self._author}
Tahun: {self._year}
ISBN: {self._isbn}
Halaman: {self._pages}
Genre: {self._genre}
Status: {status}
{'='*50}
"""
    
    def get_item_type(self) -> str:
        """Implementasi method abstract untuk tipe item"""
        return "Book"
    
    @property
    def isbn(self) -> str:
        """Getter untuk ISBN"""
        return self._isbn


class Magazine(LibraryItem):
    """
    Class untuk item majalah yang mewarisi dari LibraryItem.
    Menerapkan inheritance dan polymorphism.
    """
    
    def __init__(self, item_id: str, title: str, publisher: str, year: int,
                 issue_number: int, month: str):
        """
        Inisialisasi objek Magazine.
        
        Args:
            item_id: ID unik majalah
            title: Judul majalah
            publisher: Penerbit majalah
            year: Tahun terbit
            issue_number: Nomor edisi
            month: Bulan terbit
        """
        super().__init__(item_id, title, publisher, year)
        self._issue_number = issue_number
        self._month = month
    
    def display_info(self) -> str:
        """
        Implementasi method abstract untuk menampilkan info majalah.
        Menerapkan polymorphism.
        """
        status = "✓ Tersedia" if self._is_available else "✗ Dipinjam"
        return f"""
{'='*50}
Tipe: MAJALAH
ID: {self.item_id}
Judul: {self._title}
Penerbit: {self._author}
Tahun: {self._year}
Edisi: #{self._issue_number}
Bulan: {self._month}
Status: {status}
{'='*50}
"""
    
    def get_item_type(self) -> str:
        """Implementasi method abstract untuk tipe item"""
        return "Magazine"
    
    @property
    def issue_number(self) -> int:
        """Getter untuk nomor edisi"""
        return self._issue_number


class DVD(LibraryItem):
    """
    Class untuk item DVD yang mewarisi dari LibraryItem.
    Contoh tambahan untuk mendemonstrasikan polymorphism.
    """
    
    def __init__(self, item_id: str, title: str, director: str, year: int,
                 duration: int, genre: str):
        """
        Inisialisasi objek DVD.
        
        Args:
            item_id: ID unik DVD
            title: Judul film
            director: Sutradara
            year: Tahun rilis
            duration: Durasi dalam menit
            genre: Genre film
        """
        super().__init__(item_id, title, director, year)
        self._duration = duration
        self._genre = genre
    
    def display_info(self) -> str:
        """Implementasi method abstract untuk menampilkan info DVD"""
        status = "✓ Tersedia" if self._is_available else "✗ Dipinjam"
        return f"""
{'='*50}
Tipe: DVD
ID: {self.item_id}
Judul: {self._title}
Sutradara: {self._author}
Tahun: {self._year}
Durasi: {self._duration} menit
Genre: {self._genre}
Status: {status}
{'='*50}
"""
    
    def get_item_type(self) -> str:
        """Implementasi method abstract untuk tipe item"""
        return "DVD"


class Library:
    """
    Class untuk mengelola koleksi perpustakaan.
    Menerapkan encapsulation dan composition.
    """
    
    def __init__(self, name: str):
        """
        Inisialisasi perpustakaan.
        
        Args:
            name: Nama perpustakaan
        """
        self.__name = name  # Private attribute
        self.__items: List[LibraryItem] = []  # Private collection
        self.__borrowed_count = 0
    
    @property
    def name(self) -> str:
        """Getter untuk nama perpustakaan"""
        return self.__name
    
    @property
    def total_items(self) -> int:
        """Getter untuk total item"""
        return len(self.__items)
    
    @property
    def available_items(self) -> int:
        """Getter untuk jumlah item tersedia"""
        return sum(1 for item in self.__items if item.is_available)
    
    def add_item(self, item: LibraryItem) -> bool:
        """
        Menambahkan item ke perpustakaan.
        
        Args:
            item: Objek LibraryItem yang akan ditambahkan
            
        Returns:
            True jika berhasil ditambahkan
        """
        # Validasi: cek apakah ID sudah ada
        if any(i.item_id == item.item_id for i in self.__items):
            print(f"❌ Item dengan ID {item.item_id} sudah ada!")
            return False
        
        self.__items.append(item)
        print(f"✓ Item '{item.title}' berhasil ditambahkan!")
        return True
    
    def remove_item(self, item_id: str) -> bool:
        """
        Menghapus item dari perpustakaan.
        
        Args:
            item_id: ID item yang akan dihapus
            
        Returns:
            True jika berhasil dihapus
        """
        for i, item in enumerate(self.__items):
            if item.item_id == item_id:
                if not item.is_available:
                    print(f"❌ Item sedang dipinjam, tidak dapat dihapus!")
                    return False
                del self.__items[i]
                print(f"✓ Item dengan ID {item_id} berhasil dihapus!")
                return True
        
        print(f"❌ Item dengan ID {item_id} tidak ditemukan!")
        return False
    
    def display_all_items(self):
        """Menampilkan semua item di perpustakaan"""
        if not self.__items:
            print("\n📚 Perpustakaan masih kosong!")
            return
        
        print(f"\n{'='*60}")
        print(f"DAFTAR KOLEKSI PERPUSTAKAAN: {self.__name}")
        print(f"{'='*60}")
        print(f"Total Item: {self.total_items} | Tersedia: {self.available_items}\n")
        
        # Grouping by type (Polymorphism in action)
        books = [i for i in self.__items if i.get_item_type() == "Book"]
        magazines = [i for i in self.__items if i.get_item_type() == "Magazine"]
        dvds = [i for i in self.__items if i.get_item_type() == "DVD"]
        
        if books:
            print("📖 BUKU:")
            for book in books:
                print(f"  {book}")
        
        if magazines:
            print("\n📰 MAJALAH:")
            for mag in magazines:
                print(f"  {mag}")
        
        if dvds:
            print("\n📀 DVD:")
            for dvd in dvds:
                print(f"  {dvd}")
        
        print(f"{'='*60}\n")
    
    def search_by_title(self, title: str) -> List[LibraryItem]:
        """
        Mencari item berdasarkan judul.
        
        Args:
            title: Kata kunci judul yang dicari
            
        Returns:
            List item yang ditemukan
        """
        results = [item for item in self.__items 
                  if title.lower() in item.title.lower()]
        return results
    
    def search_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Mencari item berdasarkan ID.
        
        Args:
            item_id: ID item yang dicari
            
        Returns:
            Item jika ditemukan, None jika tidak
        """
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None
    
    def borrow_item(self, item_id: str) -> bool:
        """
        Meminjam item dari perpustakaan.
        
        Args:
            item_id: ID item yang akan dipinjam
            
        Returns:
            True jika berhasil dipinjam
        """
        item = self.search_by_id(item_id)
        if not item:
            print(f"❌ Item dengan ID {item_id} tidak ditemukan!")
            return False
        
        if item.borrow():
            self.__borrowed_count += 1
            print(f"✓ Item '{item.title}' berhasil dipinjam!")
            return True
        else:
            print(f"❌ Item '{item.title}' sedang dipinjam!")
            return False
    
    def return_item(self, item_id: str) -> bool:
        """
        Mengembalikan item ke perpustakaan.
        
        Args:
            item_id: ID item yang akan dikembalikan
            
        Returns:
            True jika berhasil dikembalikan
        """
        item = self.search_by_id(item_id)
        if not item:
            print(f"❌ Item dengan ID {item_id} tidak ditemukan!")
            return False
        
        if not item.is_available:
            item.return_item()
            print(f"✓ Item '{item.title}' berhasil dikembalikan!")
            return True
        else:
            print(f"❌ Item '{item.title}' tidak sedang dipinjam!")
            return False
    
    def get_statistics(self):
        """Menampilkan statistik perpustakaan"""
        print(f"\n{'='*50}")
        print(f"STATISTIK PERPUSTAKAAN: {self.__name}")
        print(f"{'='*50}")
        print(f"Total Item: {self.total_items}")
        print(f"Item Tersedia: {self.available_items}")
        print(f"Item Dipinjam: {self.total_items - self.available_items}")
        print(f"Total Peminjaman: {self.__borrowed_count}")
        print(f"{'='*50}\n")


def clear_screen():
    """Membersihkan layar console"""
    import os
    os.system('cls' if os.name == 'nt' else 'clear')


def display_menu():
    """Menampilkan menu utama"""
    print("\n" + "="*60)
    print("SISTEM MANAJEMEN PERPUSTAKAAN")
    print("="*60)
    print("1. Tambah Item Baru")
    print("2. Lihat Semua Item")
    print("3. Cari Item")
    print("4. Pinjam Item")
    print("5. Kembalikan Item")
    print("6. Hapus Item")
    print("7. Lihat Statistik")
    print("8. Demo Otomatis")
    print("0. Keluar")
    print("="*60)


def add_item_menu(library: Library):
    """Menu untuk menambahkan item baru"""
    print("\n" + "="*60)
    print("TAMBAH ITEM BARU")
    print("="*60)
    print("Pilih jenis item:")
    print("1. Buku")
    print("2. Majalah")
    print("3. DVD")
    print("0. Kembali")
    
    choice = input("\nPilihan Anda: ").strip()
    
    if choice == "0":
        return
    
    try:
        if choice == "1":
            # Input untuk Buku
            print("\n--- INPUT DATA BUKU ---")
            item_id = input("ID Buku (contoh: B001): ").strip()
            title = input("Judul Buku: ").strip()
            author = input("Penulis: ").strip()
            year = int(input("Tahun Terbit: ").strip())
            isbn = input("ISBN: ").strip()
            pages = int(input("Jumlah Halaman: ").strip())
            genre = input("Genre: ").strip()
            
            book = Book(item_id, title, author, year, isbn, pages, genre)
            library.add_item(book)
            
        elif choice == "2":
            # Input untuk Majalah
            print("\n--- INPUT DATA MAJALAH ---")
            item_id = input("ID Majalah (contoh: M001): ").strip()
            title = input("Judul Majalah: ").strip()
            publisher = input("Penerbit: ").strip()
            year = int(input("Tahun Terbit: ").strip())
            issue_number = int(input("Nomor Edisi: ").strip())
            month = input("Bulan Terbit: ").strip()
            
            magazine = Magazine(item_id, title, publisher, year, issue_number, month)
            library.add_item(magazine)
            
        elif choice == "3":
            # Input untuk DVD
            print("\n--- INPUT DATA DVD ---")
            item_id = input("ID DVD (contoh: D001): ").strip()
            title = input("Judul Film: ").strip()
            director = input("Sutradara: ").strip()
            year = int(input("Tahun Rilis: ").strip())
            duration = int(input("Durasi (menit): ").strip())
            genre = input("Genre: ").strip()
            
            dvd = DVD(item_id, title, director, year, duration, genre)
            library.add_item(dvd)
            
        else:
            print("❌ Pilihan tidak valid!")
            
    except ValueError as e:
        print(f"❌ Input tidak valid! {e}")
    except Exception as e:
        print(f"❌ Terjadi kesalahan: {e}")
    
    input("\nTekan Enter untuk melanjutkan...")


def search_item_menu(library: Library):
    """Menu untuk mencari item"""
    print("\n" + "="*60)
    print("PENCARIAN ITEM")
    print("="*60)
    print("1. Cari berdasarkan Judul")
    print("2. Cari berdasarkan ID")
    print("0. Kembali")
    
    choice = input("\nPilihan Anda: ").strip()
    
    if choice == "0":
        return
    
    if choice == "1":
        keyword = input("\nMasukkan kata kunci judul: ").strip()
        results = library.search_by_title(keyword)
        
        if results:
            print(f"\n✓ Ditemukan {len(results)} item:")
            for item in results:
                print(item.display_info())
        else:
            print(f"\n❌ Tidak ada item dengan judul '{keyword}'")
            
    elif choice == "2":
        item_id = input("\nMasukkan ID item: ").strip()
        item = library.search_by_id(item_id)
        
        if item:
            print(item.display_info())
        else:
            print(f"\n❌ Item dengan ID '{item_id}' tidak ditemukan!")
    else:
        print("❌ Pilihan tidak valid!")
    
    input("\nTekan Enter untuk melanjutkan...")


def borrow_item_menu(library: Library):
    """Menu untuk meminjam item"""
    print("\n" + "="*60)
    print("PEMINJAMAN ITEM")
    print("="*60)
    
    item_id = input("Masukkan ID item yang ingin dipinjam: ").strip()
    library.borrow_item(item_id)
    
    input("\nTekan Enter untuk melanjutkan...")


def return_item_menu(library: Library):
    """Menu untuk mengembalikan item"""
    print("\n" + "="*60)
    print("PENGEMBALIAN ITEM")
    print("="*60)
    
    item_id = input("Masukkan ID item yang ingin dikembalikan: ").strip()
    library.return_item(item_id)
    
    input("\nTekan Enter untuk melanjutkan...")


def remove_item_menu(library: Library):
    """Menu untuk menghapus item"""
    print("\n" + "="*60)
    print("HAPUS ITEM")
    print("="*60)
    
    item_id = input("Masukkan ID item yang ingin dihapus: ").strip()
    confirm = input(f"Yakin ingin menghapus item '{item_id}'? (y/n): ").strip().lower()
    
    if confirm == 'y':
        library.remove_item(item_id)
    else:
        print("❌ Penghapusan dibatalkan!")
    
    input("\nTekan Enter untuk melanjutkan...")


def demo_mode(library: Library):
    """Mode demonstrasi otomatis"""
    print("\n" + "="*60)
    print("MODE DEMONSTRASI OTOMATIS")
    print("="*60 + "\n")
    
    # Menambahkan berbagai item (Polymorphism)
    print("📥 MENAMBAHKAN ITEM KE PERPUSTAKAAN\n")
    
    book1 = Book("B001", "Pemrograman Python", "John Doe", 2023,
                 "978-0-123456-78-9", 450, "Programming")
    library.add_item(book1)
    
    book2 = Book("B002", "Algoritma dan Struktur Data", "Jane Smith", 2022,
                 "978-0-987654-32-1", 380, "Computer Science")
    library.add_item(book2)
    
    magazine1 = Magazine("M001", "Tech Monthly", "Tech Publishing", 2024,
                        15, "Januari")
    library.add_item(magazine1)
    
    magazine2 = Magazine("M002", "Science Today", "Science Press", 2024,
                        8, "Februari")
    library.add_item(magazine2)
    
    dvd1 = DVD("D001", "Introduction to AI", "Dr. Alan Turing", 2023,
              120, "Documentary")
    library.add_item(dvd1)
    
    input("\nTekan Enter untuk melihat koleksi...")
    
    # Menampilkan semua item
    library.display_all_items()
    
    input("\nTekan Enter untuk demonstrasi pencarian...")
    
    # Demonstrasi pencarian
    print("\n🔍 DEMONSTRASI PENCARIAN\n")
    print("Mencari item dengan kata kunci 'Python':")
    results = library.search_by_title("Python")
    for item in results:
        print(item.display_info())
    
    input("\nTekan Enter untuk demonstrasi peminjaman...")
    
    # Demonstrasi peminjaman
    print("\n📤 DEMONSTRASI PEMINJAMAN\n")
    library.borrow_item("B001")
    library.borrow_item("M001")
    library.borrow_item("B001")  # Mencoba meminjam yang sudah dipinjam
    
    input("\nTekan Enter untuk melihat status...")
    
    # Menampilkan status setelah peminjaman
    library.display_all_items()
    
    input("\nTekan Enter untuk demonstrasi pengembalian...")
    
    # Demonstrasi pengembalian
    print("\n📥 DEMONSTRASI PENGEMBALIAN\n")
    library.return_item("B001")
    
    input("\nTekan Enter untuk melihat statistik...")
    
    # Status akhir
    library.get_statistics()
    
    print("\n✓ Demo selesai!")
    input("\nTekan Enter untuk kembali ke menu utama...")


def main():
    """
    Fungsi utama dengan menu interaktif
    """
    library = Library("Perpustakaan Kota")
    
    while True:
        clear_screen()
        display_menu()
        
        choice = input("\nPilihan Anda: ").strip()
        
        if choice == "1":
            add_item_menu(library)
            
        elif choice == "2":
            library.display_all_items()
            input("\nTekan Enter untuk melanjutkan...")
            
        elif choice == "3":
            search_item_menu(library)
            
        elif choice == "4":
            borrow_item_menu(library)
            
        elif choice == "5":
            return_item_menu(library)
            
        elif choice == "6":
            remove_item_menu(library)
            
        elif choice == "7":
            library.get_statistics()
            input("\nTekan Enter untuk melanjutkan...")
            
        elif choice == "8":
            demo_mode(library)
            
        elif choice == "0":
            print("\n✓ Terima kasih telah menggunakan sistem perpustakaan!")
            print("=" * 60 + "\n")
            break
            
        else:
            print("\n❌ Pilihan tidak valid! Silakan coba lagi.")
            input("\nTekan Enter untuk melanjutkan...")


if __name__ == "__main__":
    main()