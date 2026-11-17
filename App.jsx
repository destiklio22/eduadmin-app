import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  LayoutDashboard,
  FileText,
  Calendar,
  BookMarked,
  Users,
  CheckCircle2,
  Award,
  Settings,
  Plus,
  Printer,
  Trash2,
  Save,
  RotateCcw,
  ChevronRight,
  GraduationCap,
  Clock,
  Check,
  X
} from 'lucide-react';

// --- BANK DATA KURIKULUM MERDEKA SEMUA JENJANG & FASE ---
const CURRICULUM_TEMPLATES = {
  'Fase A (Kelas 1-2 SD)': {
    defaultMapel: 'Bahasa Indonesia',
    cp: 'Berdasarkan Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025, pada akhir Fase A, peserta didik memiliki kemampuan berbahasa untuk berkomunikasi dan bernalar sesuai dengan tujuan kepada teman sebaya dan orang dewasa di sekitar tentang diri dan lingkungannya. Peserta didik mampu memahami dan menyampaikan pesan secara lisan, membaca dan mengeja kata-kata sederhana dengan fasih, serta menulis kalimat pendek dengan ejaan yang tepat.',
    tps: [
      { id: 'tp-a1', kode: 'TP 1.1', judul: 'Mengenal Huruf, Suku Kata, dan Membaca Nyaring Kata Sederhana Sehari-hari', jp: 16, status: 'SELESAI', elemen: 'Membaca dan Memirsa' },
      { id: 'tp-a2', kode: 'TP 1.2', judul: 'Menyimak Cerita Pendek dan Menceritakan Kembali Isi Cerita dengan Bahasa Sendiri', jp: 14, status: 'SELESAI', elemen: 'Menyimak' },
      { id: 'tp-a3', kode: 'TP 1.3', judul: 'Menulis Kalimat Sederhana Tentang Diri Sendiri dan Anggota Keluarga', jp: 16, status: 'DRAFT', elemen: 'Menulis' },
      { id: 'tp-a4', kode: 'TP 1.4', judul: 'Menggunakan Ungkapan Santun (Terima Kasih, Maaf, Tolong) dalam Percakapan', jp: 10, status: 'DRAFT', elemen: 'Berbicara dan Mempresentasikan' }
    ],
    moduls: [
      { id: 'ma-a1', judul: 'Modul Ajar: Aku dan Keluargaku (Membaca Permulaan)', tpKode: 'TP 1.1', pertemuan: '4 Pertemuan (16 JP)', model: 'Pembelajaran Bermain & Literasi Dasar', status: 'Siap Cetak' },
      { id: 'ma-a2', judul: 'Modul Ajar: Dongeng Hewan & Pesan Baik', tpKode: 'TP 1.2', pertemuan: '3 Pertemuan (14 JP)', model: 'Storytelling & Diskusi Kelompok', status: 'Siap Cetak' }
    ]
  },
  'Fase B (Kelas 3-4 SD)': {
    defaultMapel: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    cp: 'Berdasarkan Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025, pada akhir Fase B, peserta didik mengidentifikasi keterkaitan antara pengetahuan yang baru saja diperoleh serta mencari tahu bagaimana konsep-konsep Ilmu Pengetahuan Alam dan Sosial berkaitan satu sama lain yang ada di lingkungan sekitar dalam kehidupan sehari-hari melalui pengamatan dan percobaan sederhana.',
    tps: [
      { id: 'tp-b1', kode: 'TP 2.1', judul: 'Menganalisis Bagian Tubuh Tumbuhan dan Fungsinya bagi Kehidupan Manusia', jp: 12, status: 'SELESAI', elemen: 'Pemahaman IPAS' },
      { id: 'tp-b2', kode: 'TP 2.2', judul: 'Mengidentifikasi Wujud Zat dan Perubahan Wujud Benda di Lingkungan Sekitar', jp: 14, status: 'SELESAI', elemen: 'Keterampilan Proses' },
      { id: 'tp-b3', kode: 'TP 2.3', judul: 'Mengenal Keragaman Budaya, Kearifan Lokal, dan Bentang Alam Daerah Setempat', jp: 12, status: 'DRAFT', elemen: 'Pemahaman IPAS' },
      { id: 'tp-b4', kode: 'TP 2.4', judul: 'Memahami Gaya di Sekitar Kita dan Pengaruhnya Terhadap Gerak Benda', jp: 10, status: 'DRAFT', elemen: 'Keterampilan Proses' }
    ],
    moduls: [
      { id: 'ma-b1', judul: 'Modul Ajar: Tumbuhan Sumber Kehidupan di Bumi', tpKode: 'TP 2.1', pertemuan: '3 Pertemuan (12 JP)', model: 'Inquiry-Based Learning', status: 'Siap Cetak' },
      { id: 'ma-b2', judul: 'Modul Ajar: Eksperimen Perubahan Wujud Zat', tpKode: 'TP 2.2', pertemuan: '4 Pertemuan (14 JP)', model: 'Experimental Learning', status: 'Siap Cetak' }
    ]
  },
  'Fase C (Kelas 5-6 SD)': {
    defaultMapel: 'Matematika',
    cp: 'Berdasarkan Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025, pada akhir Fase C, peserta didik dapat menunjukkan pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 1.000.000, melakukan operasi hitung pecahan dan desimal, menghitung luas dan volume bangun ruang sederhana, serta menganalisis data penyajian tabel dan diagram batang.',
    tps: [
      { id: 'tp-c1', kode: 'TP 2.1', judul: 'Melakukan Operasi Penjumlahan, Pengurangan, Perkalian, dan Pembagian Pecahan', jp: 15, status: 'SELESAI', elemen: 'Bilangan' },
      { id: 'tp-c2', kode: 'TP 2.2', judul: 'Menghitung Volume dan Luas Permukaan Bangun Ruang Kubus dan Balok', jp: 15, status: 'SELESAI', elemen: 'Pengukuran & Geometri' },
      { id: 'tp-c3', kode: 'TP 2.3', judul: 'Menyelesaikan Masalah Sehari-hari yang Berkaitan dengan Rasio dan Skala Peta', jp: 12, status: 'DRAFT', elemen: 'Aljabar & Rasio' },
      { id: 'tp-c4', kode: 'TP 2.4', judul: 'Mengumpulkan, Membaca, dan Menafsirkan Data dalam Diagram Batang dan Garis', jp: 10, status: 'DRAFT', elemen: 'Analisis Data dan Peluang' }
    ],
    moduls: [
      { id: 'ma-c1', judul: 'Modul Ajar: Operasi Hitung Pecahan dalam Kehidupan', tpKode: 'TP 2.1', pertemuan: '5 Pertemuan (15 JP)', model: 'Problem-Based Learning (PBL)', status: 'Siap Cetak' },
      { id: 'ma-c2', judul: 'Modul Ajar: Bangun Ruang Kubus dan Balok', tpKode: 'TP 2.2', pertemuan: '5 Pertemuan (15 JP)', model: 'Project-Based Learning (PjBL)', status: 'Siap Cetak' }
    ]
  },
  'Fase D (Kelas 7-9 SMP)': {
    defaultMapel: 'Bahasa Inggris',
    cp: 'Berdasarkan Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025, pada akhir Fase D, peserta didik menggunakan teks lisan, tulisan, dan visual dalam bahasa Inggris untuk berinteraksi dan berkomunikasi dalam konteks yang lebih beragam serta dalam situasi formal dan informal. Peserta didik dapat memahami ide utama dan detail relevan dari berbagai jenis teks (recount, narrative, descriptive, dan procedure) serta menyusun teks terstruktur.',
    tps: [
      { id: 'tp-d1', kode: 'TP 2.1', judul: 'Memahami Struktur dan Unsur Kebahasaan Recount Text (Pengalaman Pribadi)', jp: 12, status: 'SELESAI', elemen: 'Membaca - Memirsa' },
      { id: 'tp-d2', kode: 'TP 2.2', judul: 'Menyusun dan Menceritakan Pengalaman Masa Lampau Menggunakan Simple Past Tense', jp: 10, status: 'SELESAI', elemen: 'Menulis - Mempresentasikan' },
      { id: 'tp-d3', kode: 'TP 2.3', judul: 'Menganalisis Nilai Moral dan Alur Cerita pada Narrative Text (Fable & Folktale)', jp: 14, status: 'DRAFT', elemen: 'Menyimak - Berbicara' },
      { id: 'tp-d4', kode: 'TP 2.4', judul: 'Membuat Pesan Singkat, Pengumuman (Announcement), dan Pemberitahuan (Notice)', jp: 8, status: 'DRAFT', elemen: 'Menulis - Mempresentasikan' }
    ],
    moduls: [
      { id: 'ma-d1', judul: 'Modul Ajar: My Unforgettable Holiday (Recount Text)', tpKode: 'TP 2.1', pertemuan: '4 Pertemuan (12 JP)', model: 'Genre-Based Approach (GBA)', status: 'Siap Cetak' },
      { id: 'ma-d2', judul: 'Modul Ajar: Telling Past Events with Simple Past Tense', tpKode: 'TP 2.2', pertemuan: '3 Pertemuan (10 JP)', model: 'Discovery Learning', status: 'Siap Cetak' },
      { id: 'ma-d3', judul: 'Modul Ajar: Indonesian Folktales & Moral Values', tpKode: 'TP 2.3', pertemuan: '4 Pertemuan (14 JP)', model: 'Project-Based Learning (PjBL)', status: 'Perlu Review' }
    ]
  },
  'Fase E (Kelas 10 SMA/SMK)': {
    defaultMapel: 'Informatika',
    cp: 'Berdasarkan Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025, pada akhir Fase E, peserta didik mampu memahami peran sistem operasi dan mekanisme internal yang terjadi pada interaksi antara perangkat keras, perangkat lunak, dan pengguna, menerapkan berpikir komputasional untuk menyelesaikan persoalan kompleks, serta merancang algoritma pemrograman terstruktur.',
    tps: [
      { id: 'tp-e1', kode: 'TP 2.1', judul: 'Menerapkan Strategi Algoritmik Standar (Searching & Sorting) pada Pemecahan Masalah', jp: 12, status: 'SELESAI', elemen: 'Berpikir Komputasional' },
      { id: 'tp-e2', kode: 'TP 2.2', judul: 'Menganalisis Jaringan Komputer Lokal, Internet, dan Keamanan Data Digital', jp: 10, status: 'SELESAI', elemen: 'Jaringan Komputer & Internet' },
      { id: 'tp-e3', kode: 'TP 2.3', judul: 'Melakukan Pengolahan, Visualisasi, dan Analisis Data Menggunakan Lembar Kerja', jp: 12, status: 'DRAFT', elemen: 'Analisis Data' },
      { id: 'tp-e4', kode: 'TP 2.4', judul: 'Mengembangkan Program Sederhana Menggunakan Bahasa Pemrograman Prosedural', jp: 14, status: 'DRAFT', elemen: 'Algoritma dan Pemrograman' }
    ],
    moduls: [
      { id: 'ma-e1', judul: 'Modul Ajar: Berpikir Komputasional (Searching & Sorting)', tpKode: 'TP 2.1', pertemuan: '4 Pertemuan (12 JP)', model: 'Problem-Based Learning (PBL)', status: 'Siap Cetak' },
      { id: 'ma-e2', judul: 'Modul Ajar: Algoritma Pemrograman Dasar', tpKode: 'TP 2.4', pertemuan: '5 Pertemuan (14 JP)', model: 'Project-Based Learning (PjBL)', status: 'Siap Cetak' }
    ]
  },
  'Fase F (Kelas 11-12 SMA/SMK)': {
    defaultMapel: 'Ekonomi / Lintas Minat',
    cp: 'Berdasarkan Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025, pada akhir Fase F, peserta didik mampu memahami dan menganalisis berbagai permasalahan ekonomi di tingkat nasional dan global, mengevaluasi kebijakan moneter dan fiskal, menyusun laporan keuangan perusahaan jasa dan dagang sederhana, serta merancang strategi kewirausahaan berkelanjutan.',
    tps: [
      { id: 'tp-f1', kode: 'TP 2.1', judul: 'Menganalisis Pendapatan Nasional, Pertumbuhan Ekonomi, dan Kesenjangan Distribusi', jp: 12, status: 'SELESAI', elemen: 'Pemahaman Konsep' },
      { id: 'tp-f2', kode: 'TP 2.2', judul: 'Mengevaluasi Dampak Inflasi, Kebijakan Moneter Bank Sentral, dan Kebijakan Fiskal', jp: 12, status: 'SELESAI', elemen: 'Keterampilan Proses' },
      { id: 'tp-f3', kode: 'TP 2.3', judul: 'Menganalisis Perdagangan Internasional, Neraca Pembayaran, dan Kurs Valuta Asing', jp: 10, status: 'DRAFT', elemen: 'Pemahaman Konsep' },
      { id: 'tp-f4', kode: 'TP 2.4', judul: 'Menyusun Siklus Akuntansi Perusahaan Jasa dan Laporan Laba Rugi Sederhana', jp: 16, status: 'DRAFT', elemen: 'Keterampilan Proses' }
    ],
    moduls: [
      { id: 'ma-f1', judul: 'Modul Ajar: Analisis Pendapatan Nasional & Pertumbuhan', tpKode: 'TP 2.1', pertemuan: '3 Pertemuan (12 JP)', model: 'Case-Based Learning', status: 'Siap Cetak' },
      { id: 'ma-f2', judul: 'Modul Ajar: Praktik Siklus Akuntansi Perusahaan Jasa', tpKode: 'TP 2.4', pertemuan: '4 Pertemuan (16 JP)', model: 'Project-Based Learning (PjBL)', status: 'Siap Cetak' }
    ]
  }
};

const DEFAULT_STUDENTS = [
  { id: 1, nisn: '0123456701', nama: 'Ahmad Budi Santoso', jk: 'L', statusHadir: 'H', f1: 85, f2: 88, sumatif: 86 },
  { id: 2, nisn: '0123456702', nama: 'Citra Lestari', jk: 'P', statusHadir: 'H', f1: 92, f2: 90, sumatif: 94 },
  { id: 3, nisn: '0123456703', nama: 'Dian Wardhana', jk: 'L', statusHadir: 'S', f1: 78, f2: 80, sumatif: 79 },
  { id: 4, nisn: '0123456704', nama: 'Eka Putri Setiawati', jk: 'P', statusHadir: 'H', f1: 88, f2: 91, sumatif: 89 },
  { id: 5, nisn: '0123456705', nama: 'Fajar Nugroho', jk: 'L', statusHadir: 'A', f1: 72, f2: 75, sumatif: 74 },
  { id: 6, nisn: '0123456706', nama: 'Gita Permata Sari', jk: 'P', statusHadir: 'H', f1: 90, f2: 89, sumatif: 92 }
];

const createClassObject = (id, nama, fase, mapel, kelas) => {
  const tpl = CURRICULUM_TEMPLATES[fase] || CURRICULUM_TEMPLATES['Fase D (Kelas 7-9 SMP)'];
  return {
    id,
    nama,
    fase,
    mapel: mapel || tpl.defaultMapel,
    kelas,
    cpText: tpl.cp,
    tps: JSON.parse(JSON.stringify(tpl.tps)),
    modulAjar: JSON.parse(JSON.stringify(tpl.moduls)),
    students: JSON.parse(JSON.stringify(DEFAULT_STUDENTS)),
    journals: [
      {
        id: `j-${id}-1`,
        tanggal: '2026-11-14',
        jamKe: '1-2',
        tpKode: `${tpl.tps[0].kode} - ${tpl.tps[0].judul}`,
        catatan: 'Siswa aktif mengikuti kegiatan inti dan diskusi kelompok.',
        hadirCount: 5,
        tidakHadirCount: 1
      }
    ]
  };
};

const INITIAL_STATE = {
  profile: {
    nama: 'Budi Santoso, S.Pd',
    nip: '19850212 201001 1 015',
    sekolah: 'Sekolah Nusantara Merdeka',
    tahunAjaran: '2026/2027',
    semester: 'Smt Genap'
  },
  activeClassId: 'cls-smp-8b',
  classes: [
    createClassObject('cls-smp-8b', 'Kelas 8 B - Bahasa Inggris', 'Fase D (Kelas 7-9 SMP)', 'Bahasa Inggris', '8'),
    createClassObject('cls-sd-4a', 'Kelas 4 A - IPAS', 'Fase B (Kelas 3-4 SD)', 'IPAS', '4'),
    createClassObject('cls-sma-10a', 'Kelas 10 A - Informatika', 'Fase E (Kelas 10 SMA/SMK)', 'Informatika', '10')
  ]
};

const STORAGE_KEY = 'eduadmin_multijenjang_v3';

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch {
      return INITIAL_STATE;
    }
  });

  const [activeMenu, setActiveMenu] = useState('cp-tp');
  const [toast, setToast] = useState(null);

  // State Modal / Form
  const [editingTp, setEditingTp] = useState(null);
  const [showAddTp, setShowAddTp] = useState(false);
  const [newTp, setNewTp] = useState({ kode: '', judul: '', jp: 8, status: 'DRAFT', elemen: 'Pemahaman Konsep' });

  const [showAddRombel, setShowAddRombel] = useState(false);
  const [rombelForm, setRombelForm] = useState({
    fase: 'Fase D (Kelas 7-9 SMP)',
    kelas: '7',
    rombel: 'A',
    mapel: 'Bahasa Inggris'
  });

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentNisn, setNewStudentNisn] = useState('');
  const [newStudentJk, setNewStudentJk] = useState('L');

  const activeClass = data.classes.find((c) => c.id === data.activeClassId) || data.classes[0];

  const [editingCp, setEditingCp] = useState(false);
  const [cpDraft, setCpDraft] = useState(activeClass.cpText);

  const [journalForm, setJournalForm] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    jamKe: '1-2',
    tpKode: activeClass.tps[0] ? `${activeClass.tps[0].kode} - ${activeClass.tps[0].judul}` : '',
    catatan: ''
  });

  // Sinkronisasi draft saat berpindah rombel/tingkatan
  useEffect(() => {
    setEditingCp(false);
    setCpDraft(activeClass.cpText);
    setJournalForm((prev) => ({
      ...prev,
      tpKode: activeClass.tps[0] ? `${activeClass.tps[0].kode} - ${activeClass.tps[0].judul}` : ''
    }));
  }, [activeClass.id]);

  // Simpan otomatis ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Gagal menyimpan data:', e);
    }
  }, [data]);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Helper update khusus kelas aktif
  const updateActiveClass = (updater) => {
    setData((prev) => ({
      ...prev,
      classes: prev.classes.map((cls) => (cls.id === prev.activeClassId ? updater(cls) : cls))
    }));
  };

  // --- HANDLERS CP & TP ---
  const handleAddTp = (e) => {
    e.preventDefault();
    if (!newTp.kode.trim() || !newTp.judul.trim()) return;
    const item = {
      id: `tp-${Date.now()}`,
      kode: newTp.kode.trim(),
      judul: newTp.judul.trim(),
      jp: Number(newTp.jp) || 8,
      status: newTp.status,
      elemen: newTp.elemen
    };
    updateActiveClass((cls) => ({ ...cls, tps: [...cls.tps, item] }));
    setNewTp({ kode: '', judul: '', jp: 8, status: 'DRAFT', elemen: 'Pemahaman Konsep' });
    setShowAddTp(false);
    showNotification('Tujuan Pembelajaran baru berhasil disimpan!');
  };

  const handleUpdateTp = (e) => {
    e.preventDefault();
    if (!editingTp) return;
    updateActiveClass((cls) => ({
      ...cls,
      tps: cls.tps.map((t) => (t.id === editingTp.id ? editingTp : t))
    }));
    setEditingTp(null);
    showNotification('Perubahan Tujuan Pembelajaran disimpan!');
  };

  const handleDeleteTp = (id) => {
    updateActiveClass((cls) => ({
      ...cls,
      tps: cls.tps.filter((t) => t.id !== id)
    }));
    setEditingTp(null);
    showNotification('Tujuan Pembelajaran dihapus.');
  };

  // --- HANDLERS PRESENSI & JURNAL ---
  const handleStatusHadir = (studentId, status) => {
    updateActiveClass((cls) => ({
      ...cls,
      students: cls.students.map((s) => (s.id === studentId ? { ...s, statusHadir: status } : s))
    }));
  };

  const handleSaveJournal = (e) => {
    e.preventDefault();
    const hadirCount = activeClass.students.filter((s) => s.statusHadir === 'H').length;
    const tidakHadirCount = activeClass.students.length - hadirCount;
    const newEntry = {
      id: `j-${Date.now()}`,
      tanggal: journalForm.tanggal,
      jamKe: journalForm.jamKe || '1-2',
      tpKode: journalForm.tpKode || (activeClass.tps[0] ? `${activeClass.tps[0].kode} - ${activeClass.tps[0].judul}` : 'Materi Umum'),
      catatan: journalForm.catatan || 'Kegiatan pembelajaran berjalan lancar.',
      hadirCount,
      tidakHadirCount
    };
    updateActiveClass((cls) => ({
      ...cls,
      journals: [newEntry, ...cls.journals]
    }));
    setJournalForm((prev) => ({ ...prev, catatan: '' }));
    showNotification('Jurnal mengajar & rekap presensi berhasil disimpan!');
  };

  // --- HANDLERS SISWA & NILAI ---
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const nextId = activeClass.students.length > 0 ? Math.max(...activeClass.students.map((s) => s.id)) + 1 : 1;
    const student = {
      id: nextId,
      nisn: newStudentNisn.trim() || `012345670${nextId}`,
      nama: newStudentName.trim(),
      jk: newStudentJk,
      statusHadir: 'H',
      f1: 80,
      f2: 80,
      sumatif: 80
    };
    updateActiveClass((cls) => ({ ...cls, students: [...cls.students, student] }));
    setNewStudentName('');
    setNewStudentNisn('');
    showNotification('Siswa baru berhasil ditambahkan!');
  };

  const handleGradeChange = (studentId, field, val) => {
    const num = Math.max(0, Math.min(100, Number(val) || 0));
    updateActiveClass((cls) => ({
      ...cls,
      students: cls.students.map((s) => (s.id === studentId ? { ...s, [field]: num } : s))
    }));
  };

  // --- HANDLER TAMBAH ROMBEL SEMUA TINGKATAN ---
  const handleFaseChange = (selectedFase) => {
    const tpl = CURRICULUM_TEMPLATES[selectedFase];
    const defaultKelasMap = {
      'Fase A (Kelas 1-2 SD)': '1',
      'Fase B (Kelas 3-4 SD)': '4',
      'Fase C (Kelas 5-6 SD)': '5',
      'Fase D (Kelas 7-9 SMP)': '7',
      'Fase E (Kelas 10 SMA/SMK)': '10',
      'Fase F (Kelas 11-12 SMA/SMK)': '11'
    };
    setRombelForm({
      ...rombelForm,
      fase: selectedFase,
      kelas: defaultKelasMap[selectedFase] || '7',
      mapel: tpl ? tpl.defaultMapel : 'Mata Pelajaran'
    });
  };

  const handleAddRombel = (e) => {
    e.preventDefault();
    const namaLengkap = `Kelas ${rombelForm.kelas} ${rombelForm.rombel} - ${rombelForm.mapel}`;
    const id = `cls-${Date.now()}`;
    const newCls = createClassObject(id, namaLengkap, rombelForm.fase, rombelForm.mapel, rombelForm.kelas);
    setData((prev) => ({
      ...prev,
      classes: [...prev.classes, newCls],
      activeClassId: id
    }));
    setShowAddRombel(false);
    showNotification(`Rombel "${namaLengkap}" (${rombelForm.fase}) berhasil dibuat!`);
  };

  const handleDeleteCurrentRombel = () => {
    if (data.classes.length <= 1) {
      showNotification('Minimal harus tersisa 1 kelas aktif.');
      return;
    }
    const remaining = data.classes.filter((c) => c.id !== activeClass.id);
    setData((prev) => ({
      ...prev,
      classes: remaining,
      activeClassId: remaining[0].id
    }));
    showNotification('Rombel berhasil dihapus.');
  };

  const handleResetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(INITIAL_STATE);
    showNotification('Semua tingkatan & data dikembalikan ke awal.');
  };

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: LayoutDashboard, group: 'UTAMA' },
    { id: 'cp-tp', label: 'CP, TP, & ATP', icon: FileText, group: 'PERANGKAT AJAR' },
    { id: 'prota-promes', label: 'Prota & Promes', icon: Calendar, group: 'PERANGKAT AJAR' },
    { id: 'modul-ajar', label: 'Modul Ajar / RPP', icon: BookMarked, group: 'PERANGKAT AJAR', badge: activeClass.modulAjar.length },
    { id: 'data-siswa', label: 'Data Siswa', icon: Users, group: 'KBM & PENILAIAN' },
    { id: 'jurnal-presensi', label: 'Jurnal & Presensi', icon: CheckCircle2, group: 'KBM & PENILAIAN' },
    { id: 'daftar-nilai', label: 'Daftar Nilai (e-Rapor)', icon: Award, group: 'KBM & PENILAIAN' },
    { id: 'pengaturan', label: 'Pengaturan & Profil', icon: Settings, group: 'SISTEM' }
  ];

  const totalJp = activeClass.tps.reduce((acc, item) => acc + (Number(item.jp) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      {/* NOTIFIKASI TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* SIDEBAR KIRI */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-none">EduAdmin</h1>
            <span className="text-[11px] text-slate-400 font-medium">Semua Jenjang (Fase A - F)</span>
          </div>
        </div>

        {/* KARTU KELAS AKTIF */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>KELAS AKTIF • {activeClass.fase.split(' ')[0]} {activeClass.fase.split(' ')[1]}</span>
            <button
              onClick={() => setActiveMenu('pengaturan')}
              className="text-slate-400 hover:text-blue-600 transition"
              title="Pengaturan Kelas"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="font-bold text-sm text-slate-800 truncate">{activeClass.nama}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {data.profile.semester} • {data.profile.tahunAjaran}
          </div>

          {/* PILIHAN ROMBEL / TINGKATAN */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {data.classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => {
                  setData((prev) => ({ ...prev, activeClassId: cls.id }));
                  showNotification(`Beralih ke ${cls.nama} (${cls.fase})`);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  cls.id === data.activeClassId
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Kls {cls.kelas}
              </button>
            ))}
            <button
              onClick={() => setShowAddRombel(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Rombel
            </button>
          </div>
        </div>

        {/* NAVIGASI MENU */}
        <nav className="p-3 flex-1 space-y-5 overflow-y-auto">
          {['UTAMA', 'PERANGKAT AJAR', 'KBM & PENILAIAN', 'SISTEM'].map((group) => (
            <div key={group}>
              <div className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                {group}
              </div>
              <div className="space-y-1">
                {menuItems
                  .filter((m) => m.group === group)
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = activeMenu === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER ATAS */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>EduAdmin</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="font-semibold text-slate-800">
              {menuItems.find((m) => m.id === activeMenu)?.label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="text-sm font-bold text-slate-800">{data.profile.nama}</div>
              <div className="text-xs text-slate-400">NIP. {data.profile.nip}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* ISI HALAMAN DINAMIS */}
        <main className="p-6 max-w-6xl w-full mx-auto space-y-6">
          {/* 1. BERANDA */}
          {activeMenu === 'beranda' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-sm">
                <h2 className="text-xl font-bold">Selamat Datang, {data.profile.nama}!</h2>
                <p className="text-blue-100 text-sm mt-1">
                  {data.profile.sekolah} • {activeClass.nama} • {activeClass.fase}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Tujuan Pembelajaran</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">{activeClass.tps.length} TP</div>
                  <div className="text-xs text-emerald-600 mt-1 font-medium">
                    {activeClass.tps.filter((t) => t.status === 'SELESAI').length} Terlaksana • Total {totalJp} JP
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Modul Ajar</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">{activeClass.modulAjar.length} Modul</div>
                  <div className="text-xs text-blue-600 mt-1 font-medium">{activeClass.fase}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Jumlah Siswa</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">{activeClass.students.length} Siswa</div>
                  <div className="text-xs text-slate-500 mt-1">Aktif di {activeClass.nama}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Jurnal Mengajar</div>
                  <div className="text-2xl font-bold text-slate-800 mt-1">{activeClass.journals.length} Pertemuan</div>
                  <div className="text-xs text-emerald-600 mt-1 font-medium">Tersimpan otomatis per rombel</div>
                </div>
              </div>
            </div>
          )}

          {/* 2. CP, TP, & ATP */}
          {activeMenu === 'cp-tp' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Capaian Pembelajaran (CP)</h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Mata Pelajaran: <strong className="text-slate-700">{activeClass.mapel}</strong> • Kelas{' '}
                      {activeClass.kelas} ({activeClass.fase})
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (editingCp) {
                        updateActiveClass((cls) => ({ ...cls, cpText: cpDraft }));
                        setEditingCp(false);
                        showNotification('Teks Capaian Pembelajaran diperbarui!');
                      } else {
                        setCpDraft(activeClass.cpText);
                        setEditingCp(true);
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    {editingCp ? 'Simpan Teks CP' : 'Edit Teks CP'}
                  </button>
                </div>

                {editingCp ? (
                  <textarea
                    rows={4}
                    value={cpDraft}
                    onChange={(e) => setCpDraft(e.target.value)}
                    className="mt-4 w-full rounded-xl border border-blue-300 p-3.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="mt-4 bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
                    {activeClass.cpText}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Alur Tujuan Pembelajaran (ATP) - {data.profile.semester}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Total Alokasi Waktu: {totalJp} Jam Pelajaran (JP)</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" /> Cetak ATP
                  </button>
                </div>

                <div className="space-y-3">
                  {activeClass.tps.map((tp) => (
                    <div
                      key={tp.id}
                      className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-200 transition"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs text-center min-w-[56px]">
                          {tp.kode}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{tp.judul}</div>
                          <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                            <span>Alokasi Waktu: {tp.jp} Jam Pelajaran (JP)</span>
                            <span>•</span>
                            <span className="text-blue-600 font-medium">Elemen: {tp.elemen}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 self-end sm:self-center">
                        <button
                          onClick={() =>
                            updateActiveClass((cls) => ({
                              ...cls,
                              tps: cls.tps.map((item) =>
                                item.id === tp.id
                                  ? { ...item, status: item.status === 'SELESAI' ? 'DRAFT' : 'SELESAI' }
                                  : item
                              )
                            }))
                          }
                          title="Klik untuk ubah status"
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide cursor-pointer ${
                            tp.status === 'SELESAI'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tp.status}
                        </button>
                        <button
                          onClick={() => setEditingTp(tp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="Edit Tujuan Pembelajaran"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {!showAddTp ? (
                  <button
                    onClick={() => setShowAddTp(true)}
                    className="mt-4 w-full py-3 rounded-xl border border-dashed border-blue-300 text-blue-600 font-semibold text-sm hover:bg-blue-50/60 transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Tambah Tujuan Pembelajaran Baru
                  </button>
                ) : (
                  <form onSubmit={handleAddTp} className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="font-semibold text-sm text-slate-800">Tambah Tujuan Pembelajaran Baru</div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <input
                        type="text"
                        placeholder="Kode (mis. TP 2.5)"
                        value={newTp.kode}
                        onChange={(e) => setNewTp({ ...newTp, kode: e.target.value })}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Deskripsi Tujuan Pembelajaran..."
                        value={newTp.judul}
                        onChange={(e) => setNewTp({ ...newTp, judul: e.target.value })}
                        className="sm:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Alokasi JP"
                        value={newTp.jp}
                        onChange={(e) => setNewTp({ ...newTp, jp: e.target.value })}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                        min={1}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        placeholder="Elemen CP (mis. Pemahaman Konsep / Membaca)"
                        value={newTp.elemen}
                        onChange={(e) => setNewTp({ ...newTp, elemen: e.target.value })}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white flex-1"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddTp(false)}
                          className="px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-200"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                        >
                          Simpan TP
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* 3. PROTA & PROMES */}
          {activeMenu === 'prota-promes' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Program Tahunan & Program Semester (Promes)</h2>
                  <p className="text-xs text-slate-500">
                    {activeClass.nama} • {activeClass.fase} • {data.profile.semester} {data.profile.tahunAjaran}
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak Promes
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200 text-xs uppercase text-slate-500">
                      <th className="py-3 px-4">Kode</th>
                      <th className="py-3 px-4">Tujuan Pembelajaran / Materi Pokok</th>
                      <th className="py-3 px-4 text-center">JP</th>
                      <th className="py-3 px-4 text-center">Jan</th>
                      <th className="py-3 px-4 text-center">Feb</th>
                      <th className="py-3 px-4 text-center">Mar</th>
                      <th className="py-3 px-4 text-center">Apr</th>
                      <th className="py-3 px-4 text-center">Mei</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeClass.tps.map((tp, idx) => (
                      <tr key={tp.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-bold text-blue-600">{tp.kode}</td>
                        <td className="py-3 px-4 font-medium text-slate-800">{tp.judul}</td>
                        <td className="py-3 px-4 text-center font-semibold">{tp.jp} JP</td>
                        <td className="py-3 px-4 text-center">{idx === 0 ? '✅' : '-'}</td>
                        <td className="py-3 px-4 text-center">{idx === 0 || idx === 1 ? '✅' : '-'}</td>
                        <td className="py-3 px-4 text-center">{idx === 1 || idx === 2 ? '✅' : '-'}</td>
                        <td className="py-3 px-4 text-center">{idx === 2 || idx === 3 ? '✅' : '-'}</td>
                        <td className="py-3 px-4 text-center">{idx >= 3 ? '✅' : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. MODUL AJAR / RPP */}
          {activeMenu === 'modul-ajar' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Modul Ajar Kurikulum Merdeka ({activeClass.fase})</h2>
                <p className="text-xs text-slate-500">Perangkat pembelajaran sesuai tingkat {activeClass.nama}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeClass.modulAjar.map((modul) => (
                  <div key={modul.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-bold">
                          {modul.tpKode}
                        </span>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {modul.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mt-3 text-base">{modul.judul}</h3>
                      <div className="mt-3 space-y-1 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {modul.pertemuan}
                        </div>
                        <div>Model: {modul.model}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="mt-5 w-full py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" /> Cetak / Unduh PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. DATA SISWA */}
          {activeMenu === 'data-siswa' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Daftar Peserta Didik ({activeClass.nama})</h2>
                <p className="text-xs text-slate-500">Total: {activeClass.students.length} Siswa Aktif</p>
              </div>

              <form onSubmit={handleAddStudent} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <input
                  type="text"
                  placeholder="NISN (opsional)"
                  value={newStudentNisn}
                  onChange={(e) => setNewStudentNisn(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                />
                <input
                  type="text"
                  placeholder="Nama Lengkap Siswa..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                  required
                />
                <select
                  value={newStudentJk}
                  onChange={(e) => setNewStudentJk(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
                >
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold text-sm rounded-lg px-4 py-2 hover:bg-blue-700 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Tambah Siswa
                </button>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs text-slate-400 uppercase">
                      <th className="py-3 px-3">No</th>
                      <th className="py-3 px-3">NISN</th>
                      <th className="py-3 px-3">Nama Siswa</th>
                      <th className="py-3 px-3 text-center">L/P</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeClass.students.map((s, index) => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 text-slate-500">{index + 1}</td>
                        <td className="py-3 px-3 font-mono text-xs text-slate-600">{s.nisn}</td>
                        <td className="py-3 px-3 font-semibold text-slate-800">{s.nama}</td>
                        <td className="py-3 px-3 text-center">{s.jk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. JURNAL & PRESENSI */}
          {activeMenu === 'jurnal-presensi' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <form
                  onSubmit={handleSaveJournal}
                  className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 h-fit"
                >
                  <h2 className="text-base font-bold text-slate-900">Jurnal Mengajar ({activeClass.nama})</h2>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Tanggal Pertemuan</label>
                    <input
                      type="date"
                      value={journalForm.tanggal}
                      onChange={(e) => setJournalForm({ ...journalForm, tanggal: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Jam Pelajaran Ke-</label>
                    <input
                      type="text"
                      placeholder="Contoh: 1-2"
                      value={journalForm.jamKe}
                      onChange={(e) => setJournalForm({ ...journalForm, jamKe: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Tujuan Pembelajaran (TP)</label>
                    <select
                      value={journalForm.tpKode}
                      onChange={(e) => setJournalForm({ ...journalForm, tpKode: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm bg-white"
                    >
                      {activeClass.tps.map((tp) => (
                        <option key={tp.id} value={`${tp.kode} - ${tp.judul}`}>
                          {tp.kode} - {tp.judul}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Catatan / Kendala (Opsional)</label>
                    <textarea
                      rows={3}
                      placeholder="Tambahkan catatan khusus..."
                      value={journalForm.catatan}
                      onChange={(e) => setJournalForm({ ...journalForm, catatan: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
                  >
                    Simpan Jurnal
                  </button>
                </form>

                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Daftar Hadir Siswa</h2>
                      <p className="text-xs text-slate-500">Tandai siswa yang tidak hadir (H/S/I/A).</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" /> Cetak
                      </button>
                      <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                        Total: {activeClass.students.length}
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {activeClass.students.map((s, idx) => (
                      <div key={s.id} className="py-3 flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-800">
                          {idx + 1}. {s.nama}
                        </span>
                        <div className="flex gap-1.5">
                          {[
                            { code: 'H', activeClass: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
                            { code: 'S', activeClass: 'bg-blue-100 text-blue-700 border-blue-300' },
                            { code: 'I', activeClass: 'bg-amber-100 text-amber-700 border-amber-300' },
                            { code: 'A', activeClass: 'bg-rose-100 text-rose-700 border-rose-300' }
                          ].map((btn) => (
                            <button
                              key={btn.code}
                              type="button"
                              onClick={() => handleStatusHadir(s.id, btn.code)}
                              className={`w-8 h-8 rounded-lg text-xs font-bold border transition ${
                                s.statusHadir === btn.code
                                  ? btn.activeClass
                                  : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              {btn.code}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-3">Riwayat Jurnal Mengajar ({activeClass.nama})</h3>
                <div className="space-y-3">
                  {activeClass.journals.map((j) => (
                    <div key={j.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-blue-600">
                          {j.tanggal} • Jam ke-{j.jamKe}
                        </div>
                        <div className="font-semibold text-sm text-slate-800 mt-0.5">{j.tpKode}</div>
                        <div className="text-xs text-slate-500 mt-1">{j.catatan}</div>
                      </div>
                      <div className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full self-start sm:self-center">
                        Hadir: {j.hadirCount} | Tidak Hadir: {j.tidakHadirCount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. DAFTAR NILAI (e-RAPOR) */}
          {activeMenu === 'daftar-nilai' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Daftar Nilai Formatif & Sumatif ({activeClass.nama})</h2>
                  <p className="text-xs text-slate-500">Klik angka nilai untuk mengedit langsung; Nilai Akhir dihitung otomatis.</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak Leger Nilai
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200 text-xs uppercase text-slate-500">
                      <th className="py-3 px-3">No</th>
                      <th className="py-3 px-3">Nama Siswa</th>
                      <th className="py-3 px-3 text-center">Formatif 1</th>
                      <th className="py-3 px-3 text-center">Formatif 2</th>
                      <th className="py-3 px-3 text-center">Sumatif Lingkup</th>
                      <th className="py-3 px-3 text-center">Nilai Rapor</th>
                      <th className="py-3 px-3 text-center">Predikat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeClass.students.map((s, idx) => {
                      const akhir = Math.round((Number(s.f1) + Number(s.f2) + Number(s.sumatif)) / 3);
                      const predikat = akhir >= 90 ? 'A (Sangat Baik)' : akhir >= 80 ? 'B (Baik)' : 'C (Cukup)';
                      return (
                        <tr key={s.id} className="hover:bg-slate-50/70">
                          <td className="py-2.5 px-3 text-slate-500">{idx + 1}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{s.nama}</td>
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="number"
                              value={s.f1}
                              onChange={(e) => handleGradeChange(s.id, 'f1', e.target.value)}
                              className="w-16 text-center rounded-lg border border-slate-200 py-1 text-sm"
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="number"
                              value={s.f2}
                              onChange={(e) => handleGradeChange(s.id, 'f2', e.target.value)}
                              className="w-16 text-center rounded-lg border border-slate-200 py-1 text-sm"
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="number"
                              value={s.sumatif}
                              onChange={(e) => handleGradeChange(s.id, 'sumatif', e.target.value)}
                              className="w-16 text-center rounded-lg border border-slate-200 py-1 text-sm"
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold text-blue-600">{akhir}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                              {predikat}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. PENGATURAN & PROFIL */}
          {activeMenu === 'pengaturan' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Pengaturan Identitas Guru & Rombel</h2>
                <p className="text-xs text-slate-500">Perubahan tersimpan otomatis di browser Anda.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    value={data.profile.nama}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, profile: { ...prev.profile, nama: e.target.value } }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">NIP / NUPTK</label>
                  <input
                    type="text"
                    value={data.profile.nip}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, profile: { ...prev.profile, nip: e.target.value } }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Satuan Pendidikan</label>
                  <input
                    type="text"
                    value={data.profile.sekolah}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, profile: { ...prev.profile, sekolah: e.target.value } }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tahun Ajaran</label>
                  <input
                    type="text"
                    value={data.profile.tahunAjaran}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, profile: { ...prev.profile, tahunAjaran: e.target.value } }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => showNotification('Identitas berhasil disimpan!')}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Simpan Pengaturan
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDeleteCurrentRombel}
                    className="px-3 py-2 rounded-xl border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-50"
                  >
                    Hapus Rombel Aktif
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="px-3 py-2 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Semua Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL EDIT TP */}
      {editingTp && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleUpdateTp} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Edit Tujuan Pembelajaran</h3>
              <button type="button" onClick={() => setEditingTp(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Kode TP</label>
              <input
                type="text"
                value={editingTp.kode}
                onChange={(e) => setEditingTp({ ...editingTp, kode: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi Tujuan Pembelajaran</label>
              <textarea
                rows={3}
                value={editingTp.judul}
                onChange={(e) => setEditingTp({ ...editingTp, judul: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alokasi JP</label>
                <input
                  type="number"
                  value={editingTp.jp}
                  onChange={(e) => setEditingTp({ ...editingTp, jp: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  min={1}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                <select
                  value={editingTp.status}
                  onChange={(e) => setEditingTp({ ...editingTp, status: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="SELESAI">SELESAI</option>
                </select>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteTp(editingTp.id)}
                className="px-3 py-2 rounded-xl text-rose-600 text-xs font-semibold hover:bg-rose-50 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Hapus TP
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTp(null)}
                  className="px-4 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TAMBAH ROMBEL SEMUA TINGKATAN */}
      {showAddRombel && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddRombel} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Tambah Rombel / Tingkatan Baru</h3>
              <button type="button" onClick={() => setShowAddRombel(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Pilih Jenjang / Fase Kurikulum</label>
              <select
                value={rombelForm.fase}
                onChange={(e) => handleFaseChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm bg-white"
              >
                {Object.keys(CURRICULUM_TEMPLATES).map((faseKey) => (
                  <option key={faseKey} value={faseKey}>
                    {faseKey}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tingkat Kelas (1-12)</label>
                <select
                  value={rombelForm.kelas}
                  onChange={(e) => setRombelForm({ ...rombelForm, kelas: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm bg-white"
                >
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((k) => (
                    <option key={k} value={k}>
                      Kelas {k}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Rombel</label>
                <input
                  type="text"
                  placeholder="Contoh: A / B / IPA-1"
                  value={rombelForm.rombel}
                  onChange={(e) => setRombelForm({ ...rombelForm, rombel: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Mata Pelajaran</label>
              <input
                type="text"
                placeholder="Contoh: Matematika / IPAS / Bahasa Indonesia"
                value={rombelForm.mapel}
                onChange={(e) => setRombelForm({ ...rombelForm, mapel: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddRombel(false)}
                className="px-4 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                Buat Rombel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}