
import { WiDirectionRight } from "react-icons/wi";
const Faq = () => {
    return (
      <div className="flex my-20 mx-[6%] justify-between">
        <div className="w-[50%]">
            <h4 className="text-[#0095ff] text-2xl pb-8 font-medium ">QUESTIONS & ANSWERS</h4>
            <h1 className="text-5xl pb-4 font-semibold">Frequently <span className="bg-[#fec458] px-3 rounded-tr-3xl">asked</span>
            </h1>
            <h1 className="text-5xl font-semibold">Questions</h1>
            <p className="pt-12 font-bold text-xl">Don't get Answer?</p>
            <p className="pt-2 pb-12">We will answer you in less than 2 Hours!!</p>
            <div>
                <button className="text-[#0095ff] font-medium text-[18px] flex justify-center">
                Leave us a Message
                <WiDirectionRight className="text-4xl" />

                </button>
            </div>

        </div>
        <div className="w-[50%]">
        <div className="accordion-group accordion-group-bordered">
	    <div className="accordion" tabIndex="0">
		<label className="accordion-title">Toggle Accordion 1</label>
	<div className="accordion-content">
		<div className="min-h-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla necessitatibus iusto laborum autem placeat aspernatur inventore eius deleniti reprehenderit? Numquam commodi totam mollitia quod</div>
		</div>
	    </div>
            <div className="accordion" tabIndex="0">
                <label className="accordion-title">Toggle Accordion 2</label>
                <div className="accordion-content">
                    <div className="min-h-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla necessitatibus iusto laborum autem placeat aspernatur inventore eius deleniti reprehenderit? Numquam commodi totam mollitia quod iure quod iure quibusdam corrupti eos quos quod iure quibusdam</div>
                </div>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Faq;