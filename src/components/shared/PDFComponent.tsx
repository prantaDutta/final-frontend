import jsPDF from 'jspdf'
import { capitalize } from '../../utils/functions'

interface PDFComponentProps {
  data: any
}

const PDFComponent: React.FC<PDFComponentProps> = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setTextColor(44, 174, 186)
    doc.text('Grayscale Transaction Receipt', 105, 10, null, 'center')
    doc.setTextColor(0, 0, 0)
    data.map((datum: any, i: number) => {
      doc.text(`${capitalize(datum[0])}: ${datum[1] ? datum[1] : 'N/A'}`, 20, 10 * (i + 2))
    })
    doc.save('transaction-receipt.pdf')
  }
  return (
    <div className="flex justify-center">
      <button onClick={generatePDF} className="primary-btn">
        Generate Receipt
      </button>
    </div>
  )
}

export default PDFComponent
