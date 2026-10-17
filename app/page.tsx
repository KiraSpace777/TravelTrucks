// тест апи
// =========================================

// "use client";

// import { useEffect } from "react";
// import { HomePageView } from "@/components/HomePageView/HomePageView";
// import { fetchCampersFromExternalService } from "@/utils/fetchCampersApi";

// const HomePage = () => {
//   useEffect(() => {
//     const testApiConnection = async () => {
//       try {
//         const responseData = await fetchCampersFromExternalService({ pageParam: 1 });
//         console.log("=== API TEST SUCCESS ===");
//         console.log("Received data structure:", responseData);
//         console.log("Total campers in database:", responseData.total);
//         console.log("Campers per page count:", responseData.campers.length);
//       } catch (error) {
//         console.error("=== API TEST FAILED ===");
//         console.error(error);
//       }
//     };

//     testApiConnection();
//   }, []);

//   return <HomePageView />;
// };

// export default HomePage;

// =============== заглушка =======================
import { HomePageView } from "@/components/HomePageView/HomePageView";

const HomePage = () => {
  return <HomePageView />;
};

export default HomePage;
