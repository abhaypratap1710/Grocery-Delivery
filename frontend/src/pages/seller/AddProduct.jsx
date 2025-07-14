// import React, { useState } from 'react';
// import { assets } from '../../assets/assets';
// import { categories } from '../../assets/assets';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const AddProduct = () => {
//   const [files, setFiles] = useState([]);
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [offerPrice, setOfferPrice] = useState('');
//   const { axios } = useAppContext();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const productData = {
//         name,
//         description: description.split('\n'),
//         category: [category], // ✅ wrap in array to match backend schema
//         price,
//         offerPrice,
//       };

//       const formData = new FormData();
//       formData.append('productData', JSON.stringify(productData));
//       for (let i = 0; i < files.length; i++) {
//         formData.append('images', files[i]);
//       }

//       const { data } = await axios.post('/api/product/add', formData);

//       if (data.success) {
//         toast.success(data.message);
//         // Clear form
//         setName('');
//         setDescription('');
//         setCategory('');
//         setPrice('');
//         setOfferPrice('');
//         setFiles([]);
//       } else {
//         toast.error(data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       toast.error(error.message || 'Server error');
//     }
//   };

//   return (
//     <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
//       <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
//         <div>
//           <p className="text-base font-medium">Product Image</p>
//           <div className="flex flex-wrap items-center gap-3 mt-2">
//             {Array(4).fill('').map((_, index) => (
//               <label key={index} htmlFor={`image${index}`}>
//                 <input
//                   type="file"
//                   id={`image${index}`}
//                   hidden
//                   onChange={(e) => {
//                     const updatedFiles = [...files];
//                     updatedFiles[index] = e.target.files[0];
//                     setFiles(updatedFiles);
//                   }}
//                 />
//                 <img
//                   className="max-w-24 cursor-pointer"
//                   src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
//                   alt="upload"
//                   width={100}
//                   height={100}
//                 />
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 max-w-md">
//           <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
//           <input
//             type="text"
//             id="product-name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Type here"
//             required
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//           />
//         </div>

//         <div className="flex flex-col gap-1 max-w-md">
//           <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
//           <textarea
//             id="product-description"
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Type here"
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
//           ></textarea>
//         </div>

//         <div className="w-full flex flex-col gap-1">
//           <label className="text-base font-medium" htmlFor="category">Category</label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//           >
//             <option value="">Select Category</option>
//             {categories.map((item, index) => (
//               <option key={index} value={item.path}>
//                 {item.path}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-5 flex-wrap">
//           <div className="flex-1 flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
//             <input
//               type="number"
//               id="product-price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="0"
//               required
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//             />
//           </div>

//           <div className="flex-1 flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
//             <input
//               type="number"
//               id="offer-price"
//               value={offerPrice}
//               onChange={(e) => setOfferPrice(e.target.value)}
//               placeholder="0"
//               required
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//             />
//           </div>
//         </div>

//         <button type="submit" className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">
//           ADD
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


// import React, { useState } from 'react';
// import { assets, categories } from '../../assets/assets';
// import toast from 'react-hot-toast';
// import { useAppContext } from '../../context/AppContext';

// const AddProduct = () => {
//   const [files, setFiles] = useState([]);
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [offerPrice, setOfferPrice] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { axios } = useAppContext();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     if (loading) return;
//     setLoading(true);

//     try {
//       const productData = {
//         name,
//         description: description.split('\n'),
//         category,
//         price,
//         offerPrice,
//       };

//       const formData = new FormData();
//       formData.append('productData', JSON.stringify(productData));
//       for (let i = 0; i < files.length; i++) {
//         formData.append('images', files[i]);
//       }

//       const { data } = await axios.post('/api/product/add', formData);

//       if (data.success) {
//         toast.success(data.message);
//         setName('');
//         setDescription('');
//         setCategory('');
//         setPrice('');
//         setOfferPrice('');
//         setFiles([]);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message || 'Error submitting form');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
//       <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
//         <div>
//           <p className="text-base font-medium">Product Image</p>
//           <div className="flex flex-wrap items-center gap-3 mt-2">
//             {Array(4).fill('').map((_, index) => (
//               <label key={index} htmlFor={`image${index}`}>
//                 <input
//                   type="file"
//                   id={`image${index}`}
//                   hidden
//                   onChange={(e) => {
//                     const updatedFiles = [...files];
//                     updatedFiles[index] = e.target.files[0];
//                     setFiles(updatedFiles);
//                   }}
//                 />
//                 <img
//                   className="max-w-24 cursor-pointer"
//                   src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
//                   alt="uploadArea"
//                   width={100}
//                   height={100}
//                 />
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 max-w-md">
//           <label htmlFor="product-name" className="text-base font-medium">Product Name</label>
//           <input
//             id="product-name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Type here"
//             required
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//           />
//         </div>

//         <div className="flex flex-col gap-1 max-w-md">
//           <label htmlFor="product-description" className="text-base font-medium">Product Description</label>
//           <textarea
//             id="product-description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//             placeholder="Type here"
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
//           />
//         </div>

//         <div className="flex flex-col gap-1 max-w-md">
//           <label htmlFor="category" className="text-base font-medium">Category</label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//           >
//             <option value="">Select Category</option>
//             {categories.map((item, index) => (
//               <option key={index} value={item.path}>{item.path}</option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-5 flex-wrap">
//           <div className="flex-1 flex flex-col gap-1 w-32">
//             <label htmlFor="product-price" className="text-base font-medium">Product Price</label>
//             <input
//               id="product-price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="0"
//               required
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//             />
//           </div>
//           <div className="flex-1 flex flex-col gap-1 w-32">
//             <label htmlFor="offer-price" className="text-base font-medium">Offer Price</label>
//             <input
//               id="offer-price"
//               type="number"
//               value={offerPrice}
//               onChange={(e) => setOfferPrice(e.target.value)}
//               placeholder="0"
//               required
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer"
//         >
//           {loading ? 'Uploading...' : 'ADD'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useEffect } from "react";
import { assets, categories } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const { axios, isSeller } = useAppContext();

  // ✅ useEffect moved outside of function
  useEffect(() => {
    if (!isSeller) {
      toast.error("Please login as seller to add products");
    }
  }, [isSeller]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isSeller) {
      toast.error("Please login as seller first");
      return;
    }
    if (loading) return;
    setLoading(true);

    try {
      const productData = {
        name,
        description: description.split("\n"),
        category: [category],
        price: Number(price),
        offerPrice: Number(offerPrice),
        inStock: true,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      // ✅ Only add valid files once
      files.forEach((file) => {
        if (file) formData.append("images", file);
      });

      console.log("files:", files);
      console.log("Submitting form with data:", productData, files);
      console.log("FormData:", formData);

      const { data } = await axios.post("/api/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name" className="text-base font-medium">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label
            htmlFor="product-description"
            className="text-base font-medium"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="category" className="text-base font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label htmlFor="product-price" className="text-base font-medium">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label htmlFor="offer-price" className="text-base font-medium">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="0"
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer"
        >
          {loading ? "Uploading..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
