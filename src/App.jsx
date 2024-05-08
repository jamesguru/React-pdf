import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "jspdf-autotable";
import jsPDF from "jspdf";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/v1/shifts");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const generatePDF = () => {
    const pdf = new jsPDF("landscape");
    // Set the title of the document
    pdf.text("Shifts Report", 15, 15);

    // set column headers

    const headers = ["ID", "LOCATION", "CLIENT", "DURATION", "TYPE", "NOTES"];

    // set data for the table

    const tabledata = data.map((item) => [
        item._id,
        item.location,
        item.client,
        item.duration,
        item.type,
        item.notes
    ]);

    // Auto page breaks and table styling

    pdf.autoTable({
      startY: 20,
      head: [headers],
      body: tabledata,
      styles: {
        fontSize: 10,
        cellWidth: "wrap",
      },
      margin: { top: 20 },
    });
    pdf.save("shiftreport.pdf");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center mt-[5%] w-[60vw]">
        <h2>Data</h2>

        <button
          className="bg-blue-500 text-white font-semibold cursor-pointer p-[10px] w-[150px]"
          onClick={generatePDF}
        >
          Download Pdf
        </button>
      </div>

      <div>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mt-[20px]">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-10 py-2">ID</th>
              <th className="px-10 py-2">Location</th>
              <th className="px-10 py-2">Client</th>
              <th className="px-10 py-2">Duration</th>
              <th className="px-10 py-2">Type</th>
              <th className="px-10 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((shift, index) => (
              <tr key={index}>
                <td className="px-10 py-2">{shift._id}</td>
                <td className="px-10 py-2">{shift.location}</td>
                <td className="px-10 py-2">{shift.client}</td>
                <td className="px-10 py-2">{shift.duration}</td>
                <td className="px-10 py-2">{shift.type}</td>
                <td className="px-10 py-2">{shift.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
