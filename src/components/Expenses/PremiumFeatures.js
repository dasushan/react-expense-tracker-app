import { selectAllExpenses } from "../store/expensesSlice";
import { useSelector } from "react-redux";
const PremiumFeatures = () => {
//     const al = document.getElementById('al')

//     const pdfBlob = new Blob(["Hello", "download"], {type: "text/plain"})

//     const url = window.URL.createObjectURL(pdfBlob)

//     console.log(url)
   
//    console.log(al)

 
const expenses = useSelector(selectAllExpenses)
console.log(expenses)
const data = [["Category", "Amount", "Description"]]
expenses.forEach((expense) => {
    let tempArr = [];
    tempArr.push(expense.category);
    tempArr.push(expense.amount);
    tempArr.push(expense.description)
    data.push(tempArr)
})
    // function makeCSV(expenses){
    //     return expenses.map(expense => expense.join(",")).join("\n")
    // }
    // console.log(makeCSV(expenses))
    function makeCSV(rows){
        return rows.map(r => r.join(' , ')).join(' \n')
        
    }
    console.log(data)
    console.log(makeCSV(data))
    console.log(typeof(makeCSV(data)))
    

   const downloadPDF = () => {
    const textBlob = new Blob([makeCSV(data)], {type: "text/plain"})
    const url = window.URL.createObjectURL(textBlob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", 'expenses.csv')
    document.body.appendChild(tempLink)
    tempLink.click()

    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url)

   }
    return(
       <button onClick={downloadPDF}> Download PDF</button>
        
    )
}

export default PremiumFeatures