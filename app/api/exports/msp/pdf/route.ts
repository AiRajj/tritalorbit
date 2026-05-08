export async function GET() {
  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 164 >>
stream
BT
/F1 18 Tf
72 720 Td
(TRITAL Orbit MSP Executive Summary) Tj
0 -32 Td
/F1 12 Tf
(Acceptance 71.2%, Backout 6.4%, Time-to-ready 4.6 days, Show-up 96.1%.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000241 00000 n 
0000000455 00000 n 
trailer
<< /Root 1 0 R /Size 6 >>
startxref
525
%%EOF`;

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="trital-orbit-msp-report.pdf"'
    }
  });
}
