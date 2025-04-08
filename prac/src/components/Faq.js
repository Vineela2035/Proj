import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Faq.css"; // Import the CSS file for styling

const Faq = () => {
    const navigate = useNavigate();
    const [visibleAnswers, setVisibleAnswers] = useState({});

    const toggleAnswer = (index) => {
        setVisibleAnswers((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const faqData = [
        { id: 1, question: "What is Agriserv?", answer: "Agriserv is a platform for students to exchange knowledge, donate books, and rent equipment." },
        { id: 2, question: "How can I give equipments for rent?", answer: "Go to the Home and register and provide details of equipment after registering." },
        { id: 3, question: "How does the equipment rental work?", answer: "Users can list equipment for rent, and others can browse and rent them." },
        { id: 4, question: "Is there a cost for using Agriserv?", answer: "No, Agriserv is a free platform for students." },
        { id: 5, question: "How do I earn points on Agriserv?", answer: "You earn points by donating books and answering doubts in the discussion section." },
        { id: 6, question: "Can I rent more than one piece of equipment?", answer: "Yes, you can rent multiple equipment as per your requirement." },
        { id: 7, question: "What is organic farming?", answer: "Organic farming avoids synthetic fertilizers and pesticides, using natural methods instead." },
        { id: 8, question: "How can I improve soil fertility?", answer: "Use crop rotation, composting, and green manure to enhance soil fertility." },
        { id: 9, question: "What are the best crops for dry regions?", answer: "Crops like millet, sorghum, and chickpeas grow well in dry areas." },
        { id: 10, question: "What is the best time to plant rice?", answer: "Rice is best planted during the monsoon season for optimal growth." },
        { id: 11, question: "What are the benefits of crop rotation?", answer: "Crop rotation improves soil fertility, reduces pests, and enhances yield." },
        { id: 12, question: "How does drip irrigation help in farming?", answer: "Drip irrigation conserves water by delivering it directly to plant roots." },
        { id: 13, question: "What are common pests in agriculture?", answer: "Common pests include aphids, caterpillars, locusts, and beetles." },
        { id: 14, question: "What is the difference between hybrid and heirloom seeds?", answer: "Hybrid seeds are crossbred for traits, while heirloom seeds are passed down naturally." },
        { id: 15, question: "How can I start a small organic farm?", answer: "Begin with composting, crop rotation, and avoiding chemical fertilizers." },
        { id: 16, question: "What is vertical farming?", answer: "Vertical farming is a method of growing crops in stacked layers indoors." },
        { id: 17, question: "How does precision farming work?", answer: "Precision farming uses technology to optimize soil, water, and crop management." },
        { id: 18, question: "What is permaculture?", answer: "Permaculture is a sustainable way of farming that mimics natural ecosystems." }
    ];

    return (
        <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            <table className="faq-table">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {faqData.map((item) => (
                        <tr key={item.id} onClick={() => toggleAnswer(item.id)}>
                            <td className="faq-question">{item.question}</td>
                            <td className="faq-answer">{visibleAnswers[item.id] ? item.answer : "Click to view answer"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="faq-button" onClick={() => navigate("/")}>Back to Home</button>
        </div>
    );
};

export default Faq;
