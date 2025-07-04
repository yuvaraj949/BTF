import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Footer from '../components/Footer';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  affiliationType: string;
  institutionName: string;
  role?: string;
  interestedEvents?: string[];
  registrationId: string;
  registrationDate: string;
}

const Pass: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const passRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    // Use full API URL in production, relative in dev
    const apiUrl =
      window.location.hostname === 'localhost'
        ? `/api/registration/${id}`
        : `https://btf-server-2025.vercel.app/api/registration/${id}`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        if (json.registrationId) setData(json);
        else navigate('/notfound');
      })
      .catch(() => navigate('/notfound'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const downloadPDF = async () => {
    if (!passRef.current) return;
    // Use higher scale for better quality
    const scale = 3;
    const canvas = await html2canvas(passRef.current, { scale });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 40, width, height);
    pdf.save(`BTF25-Pass-${data?.registrationId}.pdf`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400">Loading Pass...</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen flex flex-col bg-black text-yellow-100">
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div ref={passRef} className="bg-gradient-to-br from-yellow-900/80 to-black/90 rounded-xl shadow-lg p-8 max-w-md w-full border border-yellow-700">
          <h2 className="text-2xl font-bold text-yellow-400 text-center mb-2 font-cinzel">BITS TECHFEST 2025 PASS</h2>
          <div className="flex justify-center mb-4">
            <div style={{ borderRadius: 24, overflow: 'hidden', background: '#000', padding: 8, boxShadow: '0 0 0 6px #FFD600, 0 0 0 14px #181818' }}>
              <QRCodeSVG value={data.registrationId} size={120} bgColor="#000" fgColor="#FFD600" style={{ borderRadius: 16 }} />
            </div>
          </div>
          <div className="text-center mb-2">
            <span className="font-semibold">Registration ID:</span> <span className="text-yellow-300">{data.registrationId}</span>
          </div>
          <ul className="mb-4 text-sm">
            <li><b>Name:</b> {data.firstName} {data.lastName}</li>
            <li><b>Email:</b> {data.email}</li>
            <li><b>Phone:</b> {data.phone}</li>
            <li><b>Affiliation:</b> {data.affiliationType} - {data.institutionName}</li>
            <li><b>Role:</b> {data.role || '-'}</li>
            <li><b>Interested Events:</b> {(data.interestedEvents || []).join(', ') || '-'}</li>
          </ul>
          <div className="text-yellow-200 text-xs mb-2">Please carry this pass with you while attending the event.</div>
        </div>
        <button onClick={downloadPDF} className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded shadow">Download PDF</button>
      </main>
      <Footer />
    </div>
  );
};

export default Pass;
