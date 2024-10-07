{
  /* Date Range */
}
{
  /* <div className=" col-start-1 col-span-2 ">
  <Text className="text-black font-medium text-[15px]">DateRange</Text>
</div>; */
}
{
  /* From Date */
}
{
  /* <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1">
  <Text>From</Text>
  <Input
    className=" rounded-[5px] h-[45px] mt-2"
    placeholder="From Date"
    onChange={(newValue) =>
      setFieldValue('from', moment(newValue).format('YYYY-MM-DD'))
    }
    type="date"
  />
</div>; */
}
{
  /* To Date */
}
{
  /* <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1">
  <Text>To</Text>
  <Input
    className=" rounded-[5px] h-[45px] mt-2"
    placeholder="To Date"
    onChange={(newValue) =>
      setFieldValue('to', moment(newValue).format('YYYY-MM-DD'))
    }
    type="date"
  />
</div>; */
}

{
  /* Category */
}
{
  /* <div className="col-start-1 col-span-2">
            <Text className="text-black font-medium text-[15px]">Category</Text>
            <Select
              className="w-full mt-2 hover:bg-pink-200 focus:bg-pink-200"
              placeholder="Select Product Category"
              name="category"
              options={options}
              value={values.category}
              onClick={() => setTouched({ ...touched, category: true })}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setFieldValue('category', e.target.value);
                setTouched({ ...touched, [e.target.name]: true });
              }}
              errorMessage={(touched?.category && errors?.category) as string}
            />
          </div> */
}

{
  /* Quantity*/
}
//  <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1">
//  <Text className="text-black font-medium text-[15px]">Quantity</Text>
//  <Input
//    {...getFieldProps('quantity')}
//    className="border-[1px_solid_lightGray] rounded-[5px] h-[45px] mt-2 remove-arrow"
//    placeholder="Enter Quantity"
//    type="number"
//    errorMessage={(touched.quantity && errors.quantity) as string}
//  />
// </div>

{
  /* Select Component*/
}
//  <div className="col-start-1 col-span-2">
//  <Text className="text-black font-medium text-[15px]">Category</Text>
//  <Select
//    className="w-full mt-2 hover:bg-pink-200 focus:bg-pink-200"
//    placeholder="Select Product Category"
//    name="category"
//    options={options}
//    value={values.category}
//    onClick={() => setTouched({ ...touched, category: true })}
//    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
//      setFieldValue('category', e.target.value);
//      setTouched({ ...touched, [e.target.name]: true });
//    }}
//    errorMessage={(touched?.category && errors?.category) as string}
//  />
// </div>

// Sorted Array
// let sortedArray = getAllOnBoardingsData?.data.slice().sort((a, b) => {
//   return a.status.localeCompare(b.status);
// });

// console.log('====sortedArray=====', sortedArray);

// Styles Menu

// styles.css
// .menu ul li {
//   background-color: none;
// }

// .menu li > *:not(ul):not(.menu-title):not(details):active,
// .menu li > *:not(ul):not(.menu-title):not(details).active,
// .menu li > details > summary:active {
//   background-color: #ffffff;
//   /* color: #196f92; */
//   color: #1f2937;
// }

// .menu li > details::marker {
//   display: none;
// }
// .menu :where(li ul):before {
//   width: 0;
// }

// details[open] > summary:first-of-type {
//   background-color: #196f9233;
//   color: #196f92;
// }
