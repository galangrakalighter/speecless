// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
// import { Link } from "react-router-dom";
// import floralBorder from "@/assets/floral-border.jpg";

// const Template_3 = () => {
//   const openMap = () => {
//     window.open("https://www.google.com/maps/place/Yens+hostel/@-6.8911316,107.5595327,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68e5e3b4fbe8b1:0x85d4a2fba0dbaef5!8m2!3d-6.8911369!4d107.5621076!16s%2Fg%2F11rd2rbg5q?entry=ttu&g_ep=EgoyMDI1MTAwNy4wIKXMDSoASAFQAw%3D%3D")
//   }
//   return (
//     <div 
//       className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative"
//       style={{
//         backgroundImage: `url(${floralBorder})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundAttachment: 'fixed',
//       }}
//     >
//       <div className="absolute inset-0 bg-background/85" />
      
//       <div className="max-w-4xl mx-auto relative z-10">
//         <Link to="/">
//           <Button variant="ghost" className="mb-8 hover:bg-accent/20">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Gallery
//           </Button>

//         </Link>
//         <Link to="/">
//           <Button variant="ghost" className="absolute right-6 mb-8 hover:bg-accent/20">
//             Use Template
//             <ArrowRight className="mr-2 h-4 w-4" />
//           </Button>
//         </Link>

//         <Card className="p-12 sm:p-16 shadow-soft animate-fade-in bg-card/98 backdrop-blur-sm border-accent/30">
//           <div className="text-center space-y-8">

//             <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
//               <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-light">
//                 Together Forever
//               </p>
//               <div className="flex items-center justify-center gap-4">
//                 <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
//                 <span className="text-accent">✦</span>
//                 <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
//               </div>
//             </div>


//             <div className="flex items-center justify-center h-64 bg-gray-200" style={{ height: "40vh", width: "50vh", textAlign: "center", margin: "auto" }}>
//               <h5>Photo Template</h5>
//             </div>

             

//             <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
//               <div className="space-y-4">
//                 <h1 className="text-6xl sm:text-7xl font-script text-blush leading-tight">
//                   Olivia
//                 </h1>
//                 <p className="text-2xl text-muted-foreground font-light">&</p>
//                 <h1 className="text-6xl sm:text-7xl font-script text-sage leading-tight">
//                   Daniel
//                 </h1>
//               </div>
//             </div>

//             <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
//               <div className="flex items-center justify-center gap-4">
//                 <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
//                 <span className="text-accent">✦</span>
//                 <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
//               </div>
//               <p className="text-xl font-serif text-foreground italic">
//                 Dengan Penuh Cinta, Kami Mengundang Anda untuk Menjadi bagian dari hari istimewa kami, saat dua hati menjadi satu
//               </p>
//             </div>

//             <div className="space-y-6 py-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
//               <div className="space-y-3">
//                 <p className="text-sm tracking-wider uppercase text-muted-foreground">Saturday</p>
//                 <p className="text-4xl font-script text-foreground">
//                   June 25th
//                 </p>
//                 <p className="text-2xl font-light text-muted-foreground">
//                   2025
//                 </p>
//               </div>
              
//               <div className="space-y-2">
//                 <p className="text-lg text-muted-foreground">Ceremony begins at</p>
//                 <p className="text-2xl font-serif text-foreground">4:30 PM</p>
//               </div>
//             </div>

//             <div className="pt-8 space-y-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
//               <p className="text-xl font-serif text-foreground">Wedding Location</p>
//               <Button className="bg-gradient-sage hover:opacity-90 text-foreground px-12 py-6 text-base shadow-soft" onClick={openMap}>
//                 Click here for Information
//               </Button>
//               <p className="text-sm text-muted-foreground italic">
//                 Name Street
//               </p>
//             </div>

//             <div className="space-y-4 animate-fade-in" style={{ animationDelay: '1s' }}>
//               <div className="flex items-center justify-center gap-4">
//                 <div className="h-px w-24 bg-gradient-sage" />
//               </div>
//               <div className="space-y-2">
//                 <p className="text-xl font-serif text-foreground">Our Memory</p>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">Photo Template</div>
//                     <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">Photo Template</div>
//                     <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">Photo Template</div>
//                     <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">Photo Template</div>
//                   </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Template_3;
