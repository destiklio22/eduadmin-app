import React, { useState, useEffect } from 'react';

// --- KOMPONEN IKON (Desain Solid & Profesional) ---
const Icons = {
  Home: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Book: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  CheckCircle: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  FileText: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>,
  Upload: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
  FileExcel: () => <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
};

export default function App() {
  // State Utama & Navigasi
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mode Web App (SaaS)
  const [setupStep, setSetupStep] = useState(1); // 1: Info, 2: Upload, 3: Loading, 4: Selesai
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State Data Kelas & File
  const [classData, setClassData] = useState({
    institusi: '', // kemendikdasmen atau kemenag
    jenjang: '',
    namaSekolah: '',
    kelas: '',
    rombel: '', // ex: A, MIPA 1
    mapel: '',
    kurikulum: '', 
    tahun: '2026/2027',
    semester: '1', // 1: Ganjil, 2: Genap
    dataSource: 'dapodik' // dapodik atau emis
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  
  // State untuk Notifikasi (Toast)
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Fungsi Helper untuk menentukan Fase berdasarkan Kelas
  const getFase = (kelas) => {
    if (['1', '2'].includes(kelas)) return 'A';
    if (['3', '4'].includes(kelas)) return 'B';
    if (['5', '6'].includes(kelas)) return 'C';
    if (['7', '8', '9'].includes(kelas)) return 'D';
    if (['10'].includes(kelas)) return 'E';
    if (['11', '12'].includes(kelas)) return 'F';
    return '-';
  };

  // Simulasi Proses Pembuatan Dokumen Otomatis
  const handleProcessData = () => {
    setSetupStep(3); // Masuk fase loading
    setTimeout(() => {
      setSetupStep(4); // Selesai
    }, 2000);
  };

  // Simulasi Upload File
  const handleSimulateUpload = () => {
    // Menggunakan nama file persis seperti yang diminta untuk realisme
    setUploadedFile("daftar_pd-SMPS AL HAKIM-2026-10-08 11_54_35.xlsx");
  };

  // Fungsi untuk mendapatkan daftar Mapel dinamis berdasarkan Institusi, Kurikulum, dan Jenjang
  const getMapelList = () => {
    const { institusi, kurikulum, jenjang } = classData;
    if (!institusi || !kurikulum || !jenjang) return [];

    let kelompokAgama = [];
    let kelompokUmum = [];

    // 1. Mata Pelajaran Agama & Keagamaan
    if (institusi === 'kemenag') {
      kelompokAgama = ['Al-Qur\'an Hadis', 'Akidah Akhlak', 'Fikih', 'Sejarah Kebudayaan Islam (SKI)', 'Bahasa Arab'];
    } else {
      kelompokAgama = ['Pendidikan Agama Islam dan Budi Pekerti', 'Pendidikan Agama Kristen', 'Pendidikan Agama Katolik', 'Pendidikan Agama Hindu'];
    }

    // 2. Mata Pelajaran Umum (Berdasarkan Kurikulum & Jenjang)
    if (kurikulum === 'merdeka' || kurikulum === 'merdeka_kma450') {
      kelompokUmum = ['Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)', 'Seni dan Prakarya'];
      
      if (['SD', 'MI'].includes(jenjang)) {
        kelompokUmum.push('Ilmu Pengetahuan Alam dan Sosial (IPAS)');
      } else {
        kelompokUmum.push('Ilmu Pengetahuan Alam (IPA)', 'Ilmu Pengetahuan Sosial (IPS)', 'Informatika');
      }
    } else if (kurikulum === 'k13') {
      kelompokUmum = ['Pendidikan Pancasila dan Kewarganegaraan (PPKn)', 'Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)', 'Seni Budaya'];
      
      if (['SD', 'MI'].includes(jenjang)) {
        kelompokUmum.push('Ilmu Pengetahuan Alam (IPA)', 'Ilmu Pengetahuan Sosial (IPS)'); // Di SD K13 biasanya tematik, tapi dipecah untuk administrasi mapel
      } else {
        kelompokUmum.push('Ilmu Pengetahuan Alam (IPA)', 'Ilmu Pengetahuan Sosial (IPS)', 'Prakarya');
      }
    }

    return [...kelompokAgama, ...kelompokUmum];
  };

  // --- KOMPONEN LOGIN (SaaS Web App Gateway) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Ornamen Latar Belakang */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 z-10">
          <div className="p-8 text-center bg-blue-600 text-white relative">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner">
              <Icons.Book />
            </div>
            <h1 className="text-2xl font-bold mb-1 tracking-tight">EduAdmin SaaS</h1>
            <p className="text-blue-100 text-sm font-medium">Platform Administrasi Guru Terpadu</p>
          </div>
          <div className="p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email atau NIP</label>
                <input type="text" placeholder="budi.guru@sekolah.id" className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 transition-all" defaultValue="budi.guru@sekolah.id" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Kata Sandi</label>
                  <a href="#" className="text-xs text-blue-600 font-medium hover:underline">Lupa Sandi?</a>
                </div>
                <input type="password" placeholder="••••••••" className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 transition-all" defaultValue="password123" />
              </div>
              <button 
                onClick={() => {
                  setIsAuthenticated(true);
                  setTimeout(() => showToast('👋 Selamat datang kembali, Budi Santoso!'), 500);
                }}
                className="w-full py-3.5 mt-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                Masuk ke Aplikasi
              </button>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
              Belum memiliki lisensi? <a href="#" className="text-blue-600 font-bold hover:underline">Beli Akses di Lynk.id</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- KOMPONEN WIZARD / SETUP AWAL (Tampilan Lebih Profesional & Natural) ---
  if (setupStep < 4) {
    return (
      <div className="min-h-screen bg-[#f4f7f9] flex flex-col items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header Aplikasi (Gaya Pemerintahan/Formal) */}
          <div className="px-8 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                <Icons.Book />
              </div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Sistem Administrasi Guru</h1>
            </div>
            <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">Tahun Ajaran {classData.tahun}</span>
          </div>

          {/* Stepper Indikator */}
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between max-w-sm mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -z-10 transform -translate-y-1/2 transition-all duration-500" style={{ width: setupStep === 1 ? '0%' : setupStep === 2 ? '50%' : '100%' }}></div>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${setupStep >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>1</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${setupStep >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>2</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${setupStep >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>3</div>
            </div>
            <div className="flex justify-between max-w-md mx-auto mt-2 text-xs font-medium text-slate-500">
              <span className={setupStep >= 1 ? 'text-blue-700' : ''}>Data Kelas</span>
              <span className={setupStep >= 2 ? 'text-blue-700' : ''}>Impor Siswa</span>
              <span className={setupStep >= 3 ? 'text-blue-700' : ''}>Proses</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {setupStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Data Kelas Saya</h2>
                  <p className="text-sm text-slate-500 mt-1">Lengkapi informasi dasar kelas yang akan Anda ampu semester ini.</p>
                </div>

                {/* Pemilihan Institusi (Kemendikdasmen vs Kemenag) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Naungan Institusi</label>
                  <div className="flex space-x-4">
                    <label className={`flex-1 flex items-center justify-center p-2.5 border rounded-md cursor-pointer transition-colors ${classData.institusi === 'kemendikdasmen' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <input type="radio" name="institusi" value="kemendikdasmen" checked={classData.institusi === 'kemendikdasmen'} 
                        onChange={() => setClassData({...classData, institusi: 'kemendikdasmen', jenjang: '', kurikulum: '', dataSource: 'dapodik'})} className="sr-only" />
                      <span className="text-sm font-medium">Kemendikdasmen</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center p-2.5 border rounded-md cursor-pointer transition-colors ${classData.institusi === 'kemenag' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <input type="radio" name="institusi" value="kemenag" checked={classData.institusi === 'kemenag'} 
                        onChange={() => setClassData({...classData, institusi: 'kemenag', jenjang: '', kurikulum: '', dataSource: 'emis'})} className="sr-only" />
                      <span className="text-sm font-medium">Kementerian Agama</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tingkat Sekolah</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-slate-100 disabled:text-slate-400"
                      value={classData.jenjang}
                      onChange={(e) => setClassData({...classData, jenjang: e.target.value, kelas: '', mapel: ''})}
                      disabled={!classData.institusi}
                    >
                      <option value="">Pilih Tingkat...</option>
                      {classData.institusi === 'kemendikdasmen' && (
                        <>
                          <option value="SD">SD (Sekolah Dasar)</option>
                          <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                          <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                          <option value="SMK">SMK (Sekolah Menengah Kejuruan)</option>
                        </>
                      )}
                      {classData.institusi === 'kemenag' && (
                        <>
                          <option value="MI">MI (Madrasah Ibtidaiyah)</option>
                          <option value="MTs">MTs (Madrasah Tsanawiyah)</option>
                          <option value="MA">MA (Madrasah Aliyah)</option>
                          <option value="MAK">MAK (Madrasah Aliyah Kejuruan)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Kurikulum</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-slate-100 disabled:text-slate-400"
                      value={classData.kurikulum}
                      onChange={(e) => setClassData({...classData, kurikulum: e.target.value, mapel: ''})}
                      disabled={!classData.institusi}
                    >
                      <option value="">Pilih Kurikulum...</option>
                      {classData.institusi === 'kemendikdasmen' && (
                        <>
                          <option value="merdeka">Kurikulum Merdeka</option>
                          <option value="k13">Kurikulum 2013 (K13)</option>
                        </>
                      )}
                      {classData.institusi === 'kemenag' && (
                        <>
                          <option value="merdeka_kma450">Kurikulum Merdeka (KMA 450 Th 2024)</option>
                          <option value="k13">Kurikulum 2013 (K13)</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Sekolah / Madrasah</label>
                  <input 
                    type="text"
                    placeholder={classData.institusi === 'kemenag' ? "Contoh: MTsN 1 Kota..." : "Contoh: SMPN 1 Kota..."}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-slate-100"
                    value={classData.namaSekolah}
                    onChange={(e) => setClassData({...classData, namaSekolah: e.target.value})}
                    disabled={!classData.institusi}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Kelas (Tingkat)</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-slate-100 disabled:text-slate-400"
                      value={classData.kelas}
                      onChange={(e) => setClassData({...classData, kelas: e.target.value})}
                      disabled={!classData.jenjang}
                    >
                      <option value="">Pilih Kelas...</option>
                      {['SD', 'MI'].includes(classData.jenjang) && (
                        <>
                          <option value="1">Kelas 1</option>
                          <option value="2">Kelas 2</option>
                          <option value="3">Kelas 3</option>
                          <option value="4">Kelas 4</option>
                          <option value="5">Kelas 5</option>
                          <option value="6">Kelas 6</option>
                        </>
                      )}
                      {['SMP', 'MTs'].includes(classData.jenjang) && (
                        <>
                          <option value="7">Kelas 7</option>
                          <option value="8">Kelas 8</option>
                          <option value="9">Kelas 9</option>
                        </>
                      )}
                      {['SMA', 'SMK', 'MA', 'MAK'].includes(classData.jenjang) && (
                        <>
                          <option value="10">Kelas 10</option>
                          <option value="11">Kelas 11</option>
                          <option value="12">Kelas 12</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Rombel / Paralel</label>
                    <input 
                      type="text"
                      placeholder="Cth: A, B, MIPA 1"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-slate-100"
                      value={classData.rombel}
                      onChange={(e) => setClassData({...classData, rombel: e.target.value})}
                      disabled={!classData.kelas}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mata Pelajaran</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm disabled:bg-slate-100 disabled:text-slate-400"
                      value={classData.mapel}
                      onChange={(e) => setClassData({...classData, mapel: e.target.value})}
                      disabled={!classData.kelas || !classData.kurikulum}
                    >
                      <option value="">Pilih Mata Pelajaran...</option>
                      {getMapelList().map((mapelItem, idx) => (
                        <option key={idx} value={mapelItem}>{mapelItem}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tahun Ajaran</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      value={classData.tahun}
                      onChange={(e) => setClassData({...classData, tahun: e.target.value})}
                    >
                      <option value="2025/2026">2025/2026</option>
                      <option value="2026/2027">2026/2027</option>
                      <option value="2027/2028">2027/2028</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Semester</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      value={classData.semester}
                      onChange={(e) => setClassData({...classData, semester: e.target.value})}
                    >
                      <option value="1">Ganjil (1)</option>
                      <option value="2">Genap (2)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={() => setSetupStep(2)}
                    disabled={!classData.institusi || !classData.jenjang || !classData.namaSekolah || !classData.kelas || !classData.rombel || !classData.mapel || !classData.kurikulum}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}

            {setupStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Impor Data Peserta Didik</h2>
                  <p className="text-sm text-slate-500 mt-1">Sistem kami terintegrasi dengan format unduhan standar Dapodik dan Emis Kementerian. Tidak perlu input manual.</p>
                </div>

                {/* Pilihan Sumber Data */}
                <div className="flex space-x-4 mb-4">
                  <label className={`flex-1 flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${classData.dataSource === 'dapodik' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="source" value="dapodik" checked={classData.dataSource === 'dapodik'} onChange={() => setClassData({...classData, dataSource: 'dapodik'})} className="sr-only" disabled={classData.institusi === 'kemenag'} />
                    <span className="text-sm font-medium">Format Dapodik</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${classData.dataSource === 'emis' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="source" value="emis" checked={classData.dataSource === 'emis'} onChange={() => setClassData({...classData, dataSource: 'emis'})} className="sr-only" disabled={classData.institusi === 'kemendikdasmen'} />
                    <span className="text-sm font-medium">Format Emis</span>
                  </label>
                </div>

                {/* Area Upload (Natural/Realistis) */}
                {!uploadedFile ? (
                  <div 
                    onClick={handleSimulateUpload}
                    className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer"
                  >
                    <div className="text-slate-400 flex justify-center mb-3">
                      <Icons.Upload />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Klik untuk mengunggah file Excel (.xlsx)</p>
                    <p className="text-xs text-slate-500 mt-1">atau seret dan lepas file ke area ini.</p>
                    <p className="text-xs text-slate-400 mt-4">Sistem akan otomatis mengekstrak siswa Kelas {classData.kelas}</p>
                  </div>
                ) : (
                  <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <Icons.FileExcel />
                      <div className="truncate">
                        <p className="text-sm font-semibold text-slate-800 truncate" title={uploadedFile}>{uploadedFile}</p>
                        <p className="text-xs text-green-700 font-medium mt-0.5">
                          Berhasil diunggah • Memfilter 32 Siswa untuk Kelas {classData.kelas}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setUploadedFile(null)} className="text-xs text-slate-500 hover:text-red-500 underline ml-4 whitespace-nowrap">Ganti File</button>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button 
                    onClick={() => setSetupStep(1)}
                    className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-md shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    Kembali
                  </button>
                  <button 
                    onClick={handleProcessData}
                    disabled={!uploadedFile}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Proses Administrasi
                  </button>
                </div>
              </div>
            )}

            {setupStep === 3 && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-5 animate-fadeIn">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                <div>
                  <h3 className="text-base font-semibold text-slate-800">Memproses Data dan Sinkronisasi...</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    Sistem sedang memetakan data Dapodik, menyusun Alur Tujuan Pembelajaran (ATP), dan membuat jadwal Presensi Otomatis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN DASHBOARD UTAMA (Gaya Enterprise SaaS/Pemerintahan) ---

  const NavItem = ({ id, icon: Icon, label, badge }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all text-sm font-medium ${
        activeTab === id 
          ? 'bg-blue-50 text-blue-700' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon />
        <span>{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold">{badge}</span>
      )}
    </button>
  );

  return (
    <div className="h-screen bg-[#f4f7f9] flex overflow-hidden font-sans text-slate-800 print:bg-white print:h-auto print:overflow-visible">
      
      {/* Pengaturan Gaya Khusus Cetak Kertas F4 (Folio) */}
      <style>{`
        @media print {
          @page { size: 215.9mm 330.2mm; margin: 15mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
      
      {/* Toast Notification Premium */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeInUp print:hidden">
          <div className="bg-slate-800 text-white px-5 py-3 rounded-lg shadow-xl flex items-center space-x-3 border border-slate-700">
            <div className="text-green-400">
              <Icons.CheckCircle />
            </div>
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}

      {/* Container Khusus Cetak F4 - Tersembunyi di layar UI, muncul saat di-print */}
      <div className="hidden print:block w-full text-black">
         <div className="text-center border-b-[3px] border-double border-black pb-4 mb-6">
            <h1 className="text-xl font-bold uppercase tracking-wide">
              {classData.institusi === 'kemendikdasmen' ? 'KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH' : 'KEMENTERIAN AGAMA REPUBLIK INDONESIA'}
            </h1>
            <h2 className="text-2xl font-bold uppercase mt-1">{classData.namaSekolah || 'NAMA SEKOLAH / MADRASAH'}</h2>
            <p className="text-sm mt-2">Format Kelengkapan Administrasi Guru - Tahun Ajaran {classData.tahun} / Semester {classData.semester === '1' ? 'Ganjil' : 'Genap'}</p>
         </div>
         <div className="mb-4 flex justify-between">
            <div>
              <p className="mb-1"><strong>Mata Pelajaran:</strong> {classData.mapel || '............................'}</p>
              <p><strong>Kelas / Rombel:</strong> {classData.kelas} {classData.rombel}</p>
            </div>
            <div className="text-right">
              <p><strong>Jenis Format:</strong> Presensi / Daftar Nilai</p>
            </div>
         </div>
         <table className="w-full border-collapse border border-black mb-16">
            <thead>
               <tr className="bg-gray-100">
                 <th className="border border-black p-3 w-12">No</th>
                 <th className="border border-black p-3 text-left">Nama Peserta Didik</th>
                 <th className="border border-black p-3 w-20">L/P</th>
                 <th className="border border-black p-3 w-64">Keterangan / Nilai</th>
               </tr>
            </thead>
            <tbody>
               {Array(32).fill(0).map((_, i) => (
                 <tr key={i}>
                    <td className="border border-black p-4 text-center">{i+1}</td>
                    <td className="border border-black p-4"></td>
                    <td className="border border-black p-4"></td>
                    <td className="border border-black p-4"></td>
                 </tr>
               ))}
            </tbody>
         </table>
         <div className="flex justify-between px-16 mt-8">
            <div className="text-center">
               <p className="mb-24">Mengetahui,<br/>Kepala Sekolah/Madrasah</p>
               <p className="font-bold border-b border-black inline-block min-w-[200px]">&nbsp;</p>
               <p className="mt-1">NIP. ........................................</p>
            </div>
            <div className="text-center">
               <p className="mb-24">Guru Mata Pelajaran</p>
               <p className="font-bold border-b border-black inline-block min-w-[200px]">Budi Santoso, S.Pd</p>
               <p className="mt-1">NIP. 19850212 201001 1 015</p>
            </div>
         </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden print:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Lebih Ramping & Formal) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 print:hidden
        w-60 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo/Header Sidebar */}
        <div className="h-14 border-b border-slate-200 flex items-center px-4">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white mr-2">
            <Icons.Book />
          </div>
          <span className="font-bold text-slate-800 tracking-tight">EduAdmin</span>
        </div>

        {/* Informasi Kelas Aktif */}
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Kelas Aktif</p>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-semibold text-slate-800">Kelas {classData.kelas} {classData.rombel} - {classData.mapel}</p>
              <p className="text-xs text-slate-500 mt-0.5 truncate w-40">Smt {classData.semester === '1' ? 'Ganjil' : 'Genap'} • {classData.tahun}</p>
            </div>
            <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Pengaturan Kelas">
              <Icons.Settings />
            </button>
          </div>
          
          {/* Fitur Kelas Paralel */}
          <div className="flex items-center space-x-2 mt-3">
             <button className="flex-1 text-xs py-1.5 bg-blue-600 text-white rounded font-medium shadow-sm border border-blue-600">{classData.rombel}</button>
             <button className="flex-1 text-xs py-1.5 bg-white text-slate-600 rounded font-medium shadow-sm border border-slate-200 hover:bg-slate-50 flex justify-center items-center gap-1">
               <span className="text-lg leading-none">+</span> Rombel
             </button>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <NavItem id="dashboard" icon={Icons.Home} label="Beranda" />
          
          <div className="pt-4 pb-1">
            <p className="px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Perangkat Ajar</p>
          </div>
          <NavItem id="cp-tp" icon={Icons.FileText} label="CP, TP, & ATP" />
          <NavItem id="prota-promes" icon={Icons.FileText} label="Prota & Promes" />
          <NavItem id="modul" icon={Icons.FileText} label="Modul Ajar / RPP" badge="3" />
          
          <div className="pt-4 pb-1">
            <p className="px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">KBM & Penilaian</p>
          </div>
          <NavItem id="siswa" icon={Icons.Users} label="Data Siswa" />
          <NavItem id="presensi" icon={Icons.CheckCircle} label="Jurnal & Presensi" />
          <NavItem id="nilai" icon={Icons.FileText} label="Daftar Nilai (e-Rapor)" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden print:hidden">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center">
            <button 
              className="md:hidden p-1.5 mr-3 text-slate-500 hover:bg-slate-100 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              <Icons.Menu />
            </button>
            
            {/* Breadcrumbs Realistis */}
            <div className="hidden sm:flex text-sm text-slate-500">
              <span>EduAdmin</span>
              <span className="mx-2">/</span>
              <span className="capitalize">{activeTab === 'dashboard' ? 'Beranda' : activeTab.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-800 leading-none">Budi Santoso, S.Pd</p>
              <p className="text-xs text-slate-500 mt-1">NIP. 19850212 201001 1 015</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500">
              <Icons.Users />
            </div>
          </div>
        </header>

        {/* Dynamic Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {activeTab === 'dashboard' && (
              <>
                {/* Banner Status (Lebih fungsional, tidak terlalu "marketing") */}
                <div className="bg-white rounded-lg border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between shadow-sm">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Sinkronisasi Selesai</h2>
                    <p className="text-sm text-slate-500 mt-1">Semua dokumen administrasi untuk mata pelajaran <b>{classData.mapel}</b> (Semester {classData.semester === '1' ? 'Ganjil' : 'Genap'}) telah disiapkan.</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button 
                      onClick={() => showToast('📦 Paket Supervisi Lengkap (.zip) berhasil diunduh!')}
                      className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors"
                    >
                      Unduh Paket Supervisi (.zip)
                    </button>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Siswa (Dapodik)", value: "32", desc: "Aktif semester ini", icon: Icons.Users, color: "blue" },
                    { label: "Pertemuan / Minggu", value: "4 JP", desc: "Berdasarkan Promes", icon: Icons.FileText, color: "slate" },
                    { label: "Modul Ajar", value: "12", desc: "3 Perlu ditinjau", icon: Icons.Book, color: "amber" },
                    { label: "Kehadiran Rata-rata", value: "-", desc: "Belum ada data presensi", icon: Icons.CheckCircle, color: "slate" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                        <div className={`text-${stat.color}-500`}>
                          <stat.icon />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                      <p className="text-xs text-slate-500 mt-1">{stat.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Tabel Realistis: Jadwal & Aksi Terkini */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column (Wider) */}
                  <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                      <h3 className="text-sm font-bold text-slate-800">Daftar Siswa Terdeteksi (Pratinjau)</h3>
                      <button onClick={() => setActiveTab('siswa')} className="text-xs font-medium text-blue-600 hover:underline">Lihat Semua</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 bg-white border-b border-slate-200 uppercase font-semibold">
                          <tr>
                            <th className="px-4 py-3">No</th>
                            <th className="px-4 py-3">NISN</th>
                            <th className="px-4 py-3">Nama Lengkap</th>
                            <th className="px-4 py-3">L/P</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="px-4 py-2.5">1</td>
                            <td className="px-4 py-2.5 font-mono text-xs">0091234567</td>
                            <td className="px-4 py-2.5 font-medium text-slate-800">Ahmad Budi Santoso</td>
                            <td className="px-4 py-2.5">L</td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="px-4 py-2.5">2</td>
                            <td className="px-4 py-2.5 font-mono text-xs">0097654321</td>
                            <td className="px-4 py-2.5 font-medium text-slate-800">Citra Lestari</td>
                            <td className="px-4 py-2.5">P</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-2.5">3</td>
                            <td className="px-4 py-2.5 font-mono text-xs">0098877665</td>
                            <td className="px-4 py-2.5 font-medium text-slate-800">Dian Wardhana</td>
                            <td className="px-4 py-2.5">L</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center">
                      Diimpor dari: <span className="font-mono">{uploadedFile || 'daftar_pd-SMPS AL HAKIM-2026-10-08 11_54_35.xlsx'}</span>
                    </div>
                  </div>

                  {/* Right Column (Sidebar widget) */}
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                      <h3 className="text-sm font-bold text-slate-800">Tugas Administrasi</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1 border-slate-300 rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        <div>
                          <p className="text-sm font-medium text-slate-800 line-through">Impor Data Siswa</p>
                          <p className="text-xs text-slate-500">Selesai via Dapodik</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1 border-slate-300 rounded text-blue-600 focus:ring-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Tinjau Alur Tujuan Pembelajaran (ATP)</p>
                          <p className="text-xs text-slate-500">Sesuaikan jam pelajaran dengan kalender sekolah.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1 border-slate-300 rounded text-blue-600 focus:ring-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">Siapkan Modul Ajar Bab 1</p>
                          <p className="text-xs text-slate-500">Unduh dan sesuaikan instrumen asesmen.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-slate-100">
                      <button 
                        onClick={() => {setActiveTab('presensi'); showToast('Membuka Form Jurnal Harian...');}}
                        className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                      >
                        Isi Jurnal Harian Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Halaman Data Siswa */}
            {activeTab === 'siswa' && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
                <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Daftar Peserta Didik</h2>
                    <p className="text-sm text-slate-500 mt-1">Data difilter untuk <b>Kelas {classData.kelas}</b> dari file {classData.dataSource.toUpperCase()}.</p>
                  </div>
                  <div className="flex space-x-3">
                    <input 
                      type="text" 
                      placeholder="Cari nama atau NISN..." 
                      className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button 
                      onClick={() => showToast('📥 Data Siswa berhasil diekspor!')}
                      className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 text-sm font-medium rounded-md hover:bg-slate-200 transition-colors"
                    >
                      Ekspor
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">No</th>
                        <th className="px-6 py-4">NISN</th>
                        <th className="px-6 py-4">NIPD</th>
                        <th className="px-6 py-4">Nama Lengkap</th>
                        <th className="px-6 py-4">L/P</th>
                        <th className="px-6 py-4">Agama</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { nisn: '0091234567', nipd: '23241001', nama: 'Ahmad Budi Santoso', jk: 'L', agama: 'Islam' },
                        { nisn: '0097654321', nipd: '23241002', nama: 'Citra Lestari', jk: 'P', agama: 'Islam' },
                        { nisn: '0098877665', nipd: '23241003', nama: 'Dian Wardhana', jk: 'L', agama: 'Kristen' },
                        { nisn: '0099988776', nipd: '23241004', nama: 'Eka Putri Setiawati', jk: 'P', agama: 'Islam' },
                        { nisn: '0091122334', nipd: '23241005', nama: 'Fajar Nugroho', jk: 'L', agama: 'Islam' },
                      ].map((siswa, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-3.5">{idx + 1}</td>
                          <td className="px-6 py-3.5 font-mono text-xs text-slate-500">{siswa.nisn}</td>
                          <td className="px-6 py-3.5 font-mono text-xs text-slate-500">{siswa.nipd}</td>
                          <td className="px-6 py-3.5 font-medium text-slate-800">{siswa.nama}</td>
                          <td className="px-6 py-3.5">{siswa.jk}</td>
                          <td className="px-6 py-3.5">{siswa.agama}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                  <p className="text-sm text-slate-500">Menampilkan 5 dari 32 siswa</p>
                  <div className="flex space-x-1">
                    <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-400 bg-white cursor-not-allowed">Seb.</button>
                    <button className="px-3 py-1 border border-blue-600 rounded text-sm text-white bg-blue-600">1</button>
                    <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-700 bg-white hover:bg-slate-100">2</button>
                    <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-700 bg-white hover:bg-slate-100">Sel.</button>
                  </div>
                </div>
              </div>
            )}

            {/* Halaman CP, TP, dan ATP */}
            {activeTab === 'cp-tp' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Fase {getFase(classData.kelas)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          {classData.institusi === 'kemendikdasmen' 
                            ? 'SK BSKAP No. 046/H/KR/2025' 
                            : (['Al-Qur\'an Hadis', 'Akidah Akhlak', 'Fikih', 'Sejarah Kebudayaan Islam (SKI)', 'Bahasa Arab'].includes(classData.mapel) 
                                ? 'SK Dirjen Pendis 9941/2025' 
                                : 'KMA 450 & BSKAP 046/2025')}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-800">Capaian Pembelajaran (CP)</h2>
                      <p className="text-sm text-slate-500 mt-1">Mata Pelajaran: <b>{classData.mapel}</b> • Kelas {classData.kelas}</p>
                    </div>
                    <button 
                      onClick={() => showToast('📄 Regulasi PDF sedang diunduh...')}
                      className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors"
                    >
                      Unduh Regulasi PDF
                    </button>
                  </div>
                  <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-md">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Berdasarkan <strong>
                        {classData.institusi === 'kemendikdasmen' 
                          ? 'Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025' 
                          : (['Al-Qur\'an Hadis', 'Akidah Akhlak', 'Fikih', 'Sejarah Kebudayaan Islam (SKI)', 'Bahasa Arab'].includes(classData.mapel) 
                              ? 'KMA Nomor 450 Tahun 2024 dan SK Dirjen Pendis No. 9941 Tahun 2025' 
                              : 'KMA Nomor 450 Tahun 2024 dan Keputusan Kepala BSKAP Nomor 046/H/KR/2025')}
                      </strong>, pada akhir Fase {getFase(classData.kelas)}, peserta didik memiliki kemampuan untuk memahami konsep dasar 
                      {classData.mapel === 'Informatika' ? ' komputasi, jaringan dasar, dan literasi digital ' : 
                       classData.mapel === 'Matematika' ? ' aljabar, geometri, dan statistika dasar ' : 
                       ' materi spesifik sesuai mata pelajaran ini '} 
                      secara kritis dan menerapkannya dalam kehidupan sehari-hari melalui pendekatan saintifik dan problem solving.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-sm font-bold text-slate-800">Alur Tujuan Pembelajaran (ATP) - Semester {classData.semester === '1' ? 'Ganjil' : 'Genap'}</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { id: '1.1', title: 'Memahami Konsep Dasar', jp: 12, status: 'Selesai' },
                      { id: '1.2', title: 'Analisis Studi Kasus', jp: 8, status: 'Selesai' },
                      { id: '2.1', title: 'Penerapan Lanjutan', jp: 16, status: 'Draft' },
                      { id: '2.2', title: 'Evaluasi & Proyek Akhir', jp: 10, status: 'Draft' },
                    ].map((tp, idx) => (
                      <div key={idx} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                            TP {tp.id}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{tp.title}</p>
                            <p className="text-xs text-slate-500 mt-1">Alokasi Waktu: {tp.jp} Jam Pelajaran (JP)</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full ${tp.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                            {tp.status}
                          </span>
                          <button className="text-slate-400 hover:text-slate-700"><Icons.Settings /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-center">
                    <button className="text-sm font-medium text-blue-600 hover:underline">+ Tambah Tujuan Pembelajaran Baru</button>
                  </div>
                </div>
              </div>
            )}

            {/* Halaman Jurnal & Presensi */}
            {activeTab === 'presensi' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Form Jurnal Mengajar */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Jurnal Mengajar</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Tanggal Pertemuan</label>
                          <input type="date" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" defaultValue="2026-11-17" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Jam Pelajaran Ke-</label>
                          <input type="text" placeholder="Contoh: 1-2" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Tujuan Pembelajaran (TP)</label>
                          <select className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none bg-slate-50">
                            <option>TP 1.1 - Memahami Konsep Dasar</option>
                            <option>TP 1.2 - Analisis Studi Kasus</option>
                            <option>TP 2.1 - Penerapan Lanjutan</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Catatan / Kendala (Opsional)</label>
                          <textarea rows="3" placeholder="Tambahkan catatan khusus..." className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"></textarea>
                        </div>
                        <button 
                          onClick={() => showToast('✅ Jurnal Mengajar hari ini berhasil disimpan!')}
                          className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          Simpan Jurnal
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tabel Presensi Siswa */}
                  <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Daftar Hadir Siswa</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Tandai siswa yang tidak hadir.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => window.print()} className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-medium rounded hover:bg-slate-50 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                          <span>Cetak Kosong (F4)</span>
                        </button>
                        <div className="text-xs font-medium text-slate-500 bg-white px-3 py-1 border border-slate-200 rounded hidden sm:block">
                          Total: 32
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 bg-white border-b border-slate-200 uppercase font-semibold">
                          <tr>
                            <th className="px-5 py-3">Nama Siswa</th>
                            <th className="px-5 py-3 text-center w-40">Status Kehadiran</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { nama: 'Ahmad Budi Santoso', status: 'H' },
                            { nama: 'Citra Lestari', status: 'H' },
                            { nama: 'Dian Wardhana', status: 'S' },
                            { nama: 'Eka Putri Setiawati', status: 'H' },
                            { nama: 'Fajar Nugroho', status: 'A' },
                          ].map((siswa, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-3 font-medium text-slate-800">{idx + 1}. {siswa.nama}</td>
                              <td className="px-5 py-3">
                                <div className="flex justify-center space-x-1">
                                  <button className={`w-7 h-7 rounded text-xs font-bold ${siswa.status === 'H' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-slate-300 text-slate-400 hover:bg-slate-50'}`}>H</button>
                                  <button className={`w-7 h-7 rounded text-xs font-bold ${siswa.status === 'S' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white border border-slate-300 text-slate-400 hover:bg-slate-50'}`}>S</button>
                                  <button className={`w-7 h-7 rounded text-xs font-bold ${siswa.status === 'I' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-white border border-slate-300 text-slate-400 hover:bg-slate-50'}`}>I</button>
                                  <button className={`w-7 h-7 rounded text-xs font-bold ${siswa.status === 'A' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-white border border-slate-300 text-slate-400 hover:bg-slate-50'}`}>A</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Halaman Daftar Nilai */}
            {activeTab === 'nilai' && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
                <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Daftar Nilai (Format e-Rapor)</h2>
                    <p className="text-sm text-slate-500 mt-1">Mata Pelajaran: <b>{classData.mapel}</b> • Semester {classData.semester === '1' ? 'Ganjil' : 'Genap'}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button onClick={() => window.print()} className="flex items-center space-x-1 px-3 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                      <span className="hidden sm:inline">Cetak Kosong (F4)</span>
                    </button>
                    <button 
                      onClick={() => showToast('📊 Format Daftar Nilai berhasil diekspor ke Excel!')}
                      className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors"
                    >
                      Unduh Excel
                    </button>
                    <button 
                      onClick={() => showToast('🔄 Sinkronisasi dengan e-Rapor sedang berjalan...')}
                      className="px-4 py-2 bg-blue-600 text-white border border-blue-600 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm hidden sm:inline-block"
                    >
                      Ekspor ke e-Rapor
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-600 min-w-max">
                    <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="px-4 py-3 border-r border-slate-200" rowSpan="2">No</th>
                        <th className="px-4 py-3 border-r border-slate-200" rowSpan="2">Nama Siswa</th>
                        <th className="px-4 py-2 text-center border-r border-slate-200 border-b" colSpan="3">Nilai Formatif / Sumatif (Per TP)</th>
                        <th className="px-4 py-3 text-center border-r border-slate-200" rowSpan="2">STS</th>
                        <th className="px-4 py-3 text-center border-r border-slate-200" rowSpan="2">SAS</th>
                        <th className="px-4 py-3 text-center bg-blue-50 text-blue-800" rowSpan="2">Nilai Rapor</th>
                      </tr>
                      <tr>
                        <th className="px-3 py-1.5 text-center border-r border-slate-200 bg-white" title="Memahami Konsep Dasar">TP 1.1</th>
                        <th className="px-3 py-1.5 text-center border-r border-slate-200 bg-white" title="Analisis Studi Kasus">TP 1.2</th>
                        <th className="px-3 py-1.5 text-center border-r border-slate-200 bg-white" title="Penerapan Lanjutan">TP 2.1</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { nama: 'Ahmad Budi Santoso', n1: 85, n2: 88, n3: 90, sts: 86, sas: 88, final: 87.5 },
                        { nama: 'Citra Lestari', n1: 92, n2: 90, n3: 95, sts: 92, sas: 94, final: 92.8 },
                        { nama: 'Dian Wardhana', n1: 78, n2: 82, n3: 80, sts: 80, sas: 82, final: 80.4 },
                        { nama: 'Eka Putri Setiawati', n1: 88, n2: 85, n3: 86, sts: 88, sas: 90, final: 87.6 },
                        { nama: 'Fajar Nugroho', n1: 75, n2: 78, n3: 75, sts: 76, sas: 78, final: 76.2 },
                      ].map((siswa, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 border-r border-slate-100">{idx + 1}</td>
                          <td className="px-4 py-3 border-r border-slate-100 font-medium text-slate-800">{siswa.nama}</td>
                          <td className="px-4 py-2 border-r border-slate-100 text-center"><input type="number" defaultValue={siswa.n1} className="w-12 text-center border-b border-slate-200 focus:border-blue-500 outline-none bg-transparent" /></td>
                          <td className="px-4 py-2 border-r border-slate-100 text-center"><input type="number" defaultValue={siswa.n2} className="w-12 text-center border-b border-slate-200 focus:border-blue-500 outline-none bg-transparent" /></td>
                          <td className="px-4 py-2 border-r border-slate-100 text-center"><input type="number" defaultValue={siswa.n3} className="w-12 text-center border-b border-slate-200 focus:border-blue-500 outline-none bg-transparent" /></td>
                          <td className="px-4 py-2 border-r border-slate-100 text-center bg-slate-50/50"><input type="number" defaultValue={siswa.sts} className="w-12 text-center border-b border-slate-200 focus:border-blue-500 outline-none bg-transparent font-medium" /></td>
                          <td className="px-4 py-2 border-r border-slate-100 text-center bg-slate-50/50"><input type="number" defaultValue={siswa.sas} className="w-12 text-center border-b border-slate-200 focus:border-blue-500 outline-none bg-transparent font-medium" /></td>
                          <td className="px-4 py-2 text-center font-bold text-blue-700 bg-blue-50/30">{siswa.final}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Halaman Prota & Promes */}
            {activeTab === 'prota-promes' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Program Tahunan & Semester</h2>
                      <p className="text-sm text-slate-500 mt-1">Distribusi jam pelajaran - Semester {classData.semester === '1' ? 'Ganjil' : 'Genap'}</p>
                    </div>
                    <button 
                      onClick={() => showToast('📝 Dokumen Prota & Promes berhasil diekspor ke Word!')}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 shadow-sm whitespace-nowrap"
                    >
                      Ekspor Word (.docx)
                    </button>
                  </div>
                  <div className="p-6 overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600 border border-slate-200 min-w-[600px]">
                      <thead className="bg-slate-100 text-slate-700 font-semibold text-xs uppercase">
                        <tr>
                          <th className="p-3 border-r border-slate-200 w-16 text-center">Kode</th>
                          <th className="p-3 border-r border-slate-200">Tujuan Pembelajaran</th>
                          <th className="p-3 border-r border-slate-200 w-32 text-center">Alokasi Waktu</th>
                          <th className="p-3 text-center">Bulan Pelaksanaan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 border-r border-slate-200 text-center font-medium bg-white">TP 1.1</td>
                          <td className="p-3 border-r border-slate-200 bg-white">Memahami Konsep Dasar</td>
                          <td className="p-3 border-r border-slate-200 text-center bg-white">12 JP</td>
                          <td className="p-3 text-center bg-white">Juli - Agustus</td>
                        </tr>
                        <tr className="border-b border-slate-200 bg-slate-50">
                          <td className="p-3 border-r border-slate-200 text-center font-medium">TP 1.2</td>
                          <td className="p-3 border-r border-slate-200">Analisis Studi Kasus</td>
                          <td className="p-3 border-r border-slate-200 text-center">8 JP</td>
                          <td className="p-3 text-center">Agustus</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 border-r border-slate-200 text-center font-medium bg-white">TP 2.1</td>
                          <td className="p-3 border-r border-slate-200 bg-white">Penerapan Lanjutan</td>
                          <td className="p-3 border-r border-slate-200 text-center bg-white">16 JP</td>
                          <td className="p-3 text-center bg-white">September - Oktober</td>
                        </tr>
                        <tr className="bg-blue-50 font-bold text-slate-800">
                          <td colSpan="2" className="p-3 border-r border-slate-200 text-right">Total Jam Pelajaran:</td>
                          <td className="p-3 border-r border-slate-200 text-center text-blue-700">36 JP</td>
                          <td className="p-3"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Halaman Modul Ajar / RPP */}
            {activeTab === 'modul' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Modul Ajar / RPP</h2>
                      <p className="text-sm text-slate-500 mt-1">Dokumen pendukung mengajar (Bahan Ajar, LKPD, Asesmen)</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 text-sm font-medium rounded-md hover:bg-blue-100 whitespace-nowrap">
                      + Buat Modul Baru
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Bab 1: Konsep Dasar', status: 'Siap Digunakan', date: 'Diperbarui 2 hari lalu' },
                      { title: 'Bab 2: Studi Kasus', status: 'Perlu Tinjauan', date: 'Diperbarui 1 minggu lalu' },
                      { title: 'Bab 3: Penerapan', status: 'Draft', date: 'Dibuat otomatis' },
                    ].map((modul, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Icons.Book />
                          </div>
                          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${modul.status === 'Siap Digunakan' ? 'bg-green-100 text-green-700' : modul.status === 'Perlu Tinjauan' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                            {modul.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-1">{modul.title}</h3>
                        <p className="text-xs text-slate-500 mb-4">{modul.date}</p>
                        <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium border-t border-slate-100 pt-3">
                          <Icons.FileText />
                          <span>Buka & Edit Modul</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder untuk Halaman Lain yang belum dibuat (sudah dihilangkan modul/prota) */}
            {activeTab !== 'dashboard' && activeTab !== 'siswa' && activeTab !== 'cp-tp' && activeTab !== 'presensi' && activeTab !== 'nilai' && activeTab !== 'prota-promes' && activeTab !== 'modul' && (
              <div className="bg-white border border-slate-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Icons.Settings />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Modul "{activeTab.replace('-', ' ')}"</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-sm">
                  Halaman ini dalam proses pengembangan. Data Anda dari {classData.dataSource === 'dapodik' ? 'Dapodik' : 'Emis'} sudah tersimpan dan akan digunakan di sini.
                </p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-6 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded hover:bg-slate-200 transition-colors"
                >
                  Kembali ke Beranda
                </button>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}