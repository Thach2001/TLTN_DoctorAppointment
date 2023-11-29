import { useState, useEffect } from "react";
import axios from "../../config/axiosConfigCommon";
import FaqItem from "../components/Faq/FaqItem";

const Faq = () => {
   const [faqs, setFaqs] = useState([]);

   useEffect(() => {
      const getAllFaq = async () => {
         const res = await axios.get("api/faqs");

         const faqsData = res.data.data;

         const filteredFaqs = [...faqsData].reverse();

         setFaqs(filteredFaqs);
      };

      getAllFaq();
   }, []);

   return (
      <section className="container">
         <ul>
            {faqs.map((faq) => (
               <FaqItem key={faqs._id} faq={faq} />
            ))}
         </ul>
      </section>
   );
};

export default Faq;
