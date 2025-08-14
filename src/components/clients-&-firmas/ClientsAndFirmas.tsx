const institutions = [
  "UNESCO",
  "Casa del Alba, Cultural Center",
  "Qiibee",
  "Squib",
  "Mundus Vita",
];

const ClientsAndFirmas = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-30">
      <p className="text-[1.125rem] max-w-[45rem] text-base/14">
        Companies, startups, and organizations to which I have offered{" "}
        <span className="text-color0">my services.</span>
      </p>

      <ul className="list-disc pl-5">
        {institutions.map((institution, index) => (
          <li key={index} className="text-[1.125rem] list-none">
            {institution}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsAndFirmas;
