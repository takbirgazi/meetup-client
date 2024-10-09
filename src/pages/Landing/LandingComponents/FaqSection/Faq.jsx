

const Faq = () => {
    return (
      <div className="flex my-32 mx-10 gap-10">
        <div className="w-[50%]">
            <h1 className="text-5xl pb-6 font-semibold">Frequently <span className="bg-[#fec458] px-2">asked</span>
            </h1>
            <h1 className="text-5xl">Questions</h1>

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