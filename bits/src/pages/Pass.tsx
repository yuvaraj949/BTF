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

interface MemberPassData {
  type: 'member';
  memberId: string;
  name: string;
  email: string;
  phone: string;
  degree: string;
  teamId: string;
  teamName: string;
  university: string;
  registrationDate: string;
}

interface TeamPassData {
  type: 'team';
  teamId: string;
  teamName: string;
  university: string;
  leader: any;
  teammates: any[];
  registrationDate: string;
}

const Pass: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<RegistrationData | null>(null);
  const [memberData, setMemberData] = useState<MemberPassData | null>(null);
  const [teamData, setTeamData] = useState<TeamPassData | null>(null);
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
        if (json.type === 'member') setMemberData(json);
        else if (json.type === 'team') setTeamData(json);
        else if (json.registrationId) setData(json);
        else navigate('/notfound');
      })
      .catch(() => navigate('/notfound'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const downloadPDF = async () => {
    if (!passRef.current) return;
    // Use higher scale for better quality when generating QR code
    const scale = 3;
    const canvas = await html2canvas(passRef.current, { scale, backgroundColor: '#101010' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    // Fill background with even darker color
    pdf.setFillColor(16, 16, 16); // #101010
    pdf.rect(0, 0, width, pdf.internal.pageSize.getHeight(), 'F');
    pdf.addImage(imgData, 'PNG', 0, 40, width, height);
    pdf.save(`BTF25-Pass-${id}.pdf`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-[#F66200]">Loading Pass...</div>;
  if (!data && !memberData && !teamData) return null;

  if (memberData) {
    // Individual member pass
    return (
      <div className="min-h-screen flex flex-col bg-black text-[#F66200]/90">
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <div ref={passRef} className="bg-gradient-to-br from-[#101010] via-black to-[#181818] rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-[#F66200] relative overflow-hidden">
            {/* Watermark image, centered and semi-transparent */}
            <img
              src={'https://btf-2025.vercel.app/lovable-uploads/75563aab-1419-470f-86da-f6c102723c1d.png'}
              alt="Event Watermark"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                opacity: 0.10,
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
            <h2 className="text-3xl font-extrabold text-[#F66200] text-center mb-2 font-cinzel drop-shadow-lg" style={{letterSpacing:'2px'}}>ENGENITY HACKATHON PASS</h2>
            <div className="flex justify-center mb-4 z-10">
              <div style={{ borderRadius: 24, overflow: 'hidden', background: '#000', padding: 8, boxShadow: '0 0 0 6px #F66200, 0 0 0 14px #101010' }}>
                <QRCodeSVG value={memberData.memberId} size={120} bgColor="#000" fgColor="#F66200" style={{ borderRadius: 16 }} />
              </div>
            </div>
            <div className="text-center mb-2 z-10">
              <span className="font-semibold" style={{color:'#F66200'}}>Member ID:</span> <span className="font-bold" style={{color:'#F66200'}}>{memberData.memberId}</span>
            </div>
            <ul className="mb-4 text-base z-10">
              <li><b style={{color:'#F66200'}}>Name:</b> <span style={{color:'#F66200'}}>{memberData.name}</span></li>
              <li><b style={{color:'#F66200'}}>Email:</b> <span style={{color:'#F66200'}}>{memberData.email}</span></li>
              <li><b style={{color:'#F66200'}}>Phone:</b> <span style={{color:'#F66200'}}>{memberData.phone}</span></li>
              <li><b style={{color:'#F66200'}}>Degree:</b> <span style={{color:'#F66200'}}>{memberData.degree}</span></li>
              <li><b style={{color:'#F66200'}}>Team:</b> <span style={{color:'#F66200'}}>{memberData.teamName} ({memberData.teamId})</span></li>
              <li><b style={{color:'#F66200'}}>University:</b> <span style={{color:'#F66200'}}>{memberData.university}</span></li>
            </ul>
            <div className="text-xs mb-2 z-10" style={{color:'#F66200'}}>This pass is valid for both days of the event (12th and 15th November 2025). Please carry this pass with you while attending the event.</div>
          </div>
          <button onClick={downloadPDF} className="mt-6 px-6 py-2 bg-[#F66200] hover:bg-orange-700 text-black font-bold rounded shadow">Download PDF</button>
        </main>
        <Footer />
      </div>
    );
  }
  if (teamData) {
    // Team pass
    return (
      <div className="min-h-screen flex flex-col bg-black text-[#F66200]/90">
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <div ref={passRef} className="bg-gradient-to-br from-[#101010] via-black to-[#181818] rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-[#F66200] relative overflow-hidden">
            {/* Watermark image, centered and semi-transparent */}
            <img
              src={'/favicon.ico'}
              alt="Event Watermark"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                opacity: 0.10,
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
            <h2 className="text-3xl font-extrabold text-[#F66200] text-center mb-2 font-cinzel drop-shadow-lg" style={{letterSpacing:'2px'}}>ENGENITY HACKATHON TEAM PASS</h2>
            <div className="flex justify-center mb-4 z-10">
              <div style={{ borderRadius: 24, overflow: 'hidden', background: '#000', padding: 8, boxShadow: '0 0 0 6px #F66200, 0 0 0 14px #101010' }}>
                <QRCodeSVG value={teamData.teamId} size={120} bgColor="#000" fgColor="#F66200" style={{ borderRadius: 16 }} />
              </div>
            </div>
            <div className="text-center mb-2 z-10">
              <span className="font-semibold" style={{color:'#F66200'}}>Team ID:</span> <span className="font-bold" style={{color:'#F66200'}}>{teamData.teamId}</span>
            </div>
            <ul className="mb-4 text-base z-10">
              <li><b style={{color:'#F66200'}}>Team Name:</b> <span style={{color:'#F66200'}}>{teamData.teamName}</span></li>
              <li><b style={{color:'#F66200'}}>University:</b> <span style={{color:'#F66200'}}>{teamData.university}</span></li>
              <li><b style={{color:'#F66200'}}>Leader:</b> <span style={{color:'#F66200'}}>{teamData.leader.name} ({teamData.leader.email}, {teamData.leader.phone}, {teamData.leader.degree}, ID: {teamData.leader.memberId})</span></li>
              <li><b style={{color:'#F66200'}}>Teammates:</b>
                <ul className="pl-4">
                  {teamData.teammates.map((m, i) => (
                    <li key={i}><span style={{color:'#F66200'}}>{m.name} ({m.email}, {m.phone}, {m.degree}, ID: {m.memberId})</span></li>
                  ))}
                </ul>
              </li>
            </ul>
            <div className="text-xs mb-2 z-10" style={{color:'#F66200'}}>This pass is valid for both days of the event (12th and 15th November 2025). Please carry this pass with you while attending the event.</div>
          </div>
          <button onClick={downloadPDF} className="mt-6 px-6 py-2 bg-[#F66200] hover:bg-orange-700 text-black font-bold rounded shadow">Download PDF</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#F66200]/90">
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div ref={passRef} className="bg-gradient-to-br from-[#101010] via-black to-[#181818] rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-[#F66200] relative overflow-hidden">
          {/* Watermark image, centered and semi-transparent */}
          <img
            src={process.env.PUBLIC_URL + '/lovable-uploads/75563aab-1419-470f-86da-f6c102723c1d.png'}
            alt="Event Watermark"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              opacity: 0.10,
              zIndex: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
          <h2 className="text-3xl font-extrabold text-[#F66200] text-center mb-2 font-cinzel drop-shadow-lg" style={{letterSpacing:'2px'}}>BITS TECHFEST 2025 PASS</h2>
          <div className="flex justify-center mb-4 z-10">
            <div style={{ borderRadius: 24, overflow: 'hidden', background: '#000', padding: 8, boxShadow: '0 0 0 6px #F66200, 0 0 0 14px #101010' }}>
              <QRCodeSVG value={data?.registrationId} size={120} bgColor="#000" fgColor="#F66200" style={{ borderRadius: 16 }} />
            </div>
          </div>
          <div className="text-center mb-2 z-10">
            <span className="font-semibold" style={{color:'#F66200'}}>Registration ID:</span> <span className="font-bold" style={{color:'#F66200'}}>{data?.registrationId}</span>
          </div>
          <ul className="mb-4 text-base z-10">
            <li><b style={{color:'#F66200'}}>Name:</b> <span style={{color:'#F66200'}}>{data?.firstName} {data?.lastName}</span></li>
            <li><b style={{color:'#F66200'}}>Email:</b> <span style={{color:'#F66200'}}>{data?.email}</span></li>
            <li><b style={{color:'#F66200'}}>Phone:</b> <span style={{color:'#F66200'}}>{data?.phone}</span></li>
            <li><b style={{color:'#F66200'}}>Affiliation:</b> <span style={{color:'#F66200'}}>{data?.affiliationType} - {data?.institutionName}</span></li>
          </ul>
          <div className="text-xs mb-2 z-10" style={{color:'#F66200'}}>This pass is valid for both days of the event (12th and 15th November 2025). Please carry this pass with you while attending the event.</div>
        </div>
        <button onClick={downloadPDF} className="mt-6 px-6 py-2 bg-[#F66200] hover:bg-orange-700 text-black font-bold rounded shadow">Download PDF</button>
      </main>
      <Footer />
    </div>
  );
};

export default Pass;
