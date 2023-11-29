const Specialization = ({
   specializations,
   filterSpecialization,
   setFilterSpecialization,
   setPage,
}) => {
   const onChange = ({ currentTarget: input }) => {
      if (input.checked) {
         const state = [...filterSpecialization, input.value];
         setFilterSpecialization(state);
      } else {
         const state = filterSpecialization.filter(
            (val) => val !== input.value
         );
         setFilterSpecialization(state);
      }
      setPage(1);
   };

   return (
      <div>
         <h1 className="font-medium text-lg">Lọc theo chuyên môn:</h1>
         <div className="font-normal text-lg">
            {specializations.map((specialization, index) => (
               <div className="flex items-center gap-5" key={index}>
                  <input
                     type="checkbox"
                     value={specialization}
                     onChange={onChange}
                  />
                  <p>{specialization}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Specialization;
