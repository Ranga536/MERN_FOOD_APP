import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import FooterInfo from "@/components/shopping-view/footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06041b] via-[#2d1c66] to-[#000000] py-20 px-4 md:px-24 text-white">
      <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-10 max-w-6xl mx-auto shadow-xl border border-white/10">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Connect With Us
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We’re just a call or a click away. Reach out to us for support, questions, or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Card className="bg-white/10 border border-white/20 text-white shadow-xl rounded-2xl p-6 transition-all hover:scale-105 hover:bg-white/20">
            <CardContent className="flex flex-col items-center text-center gap-4">
              <MapPin className="text-yellow-400 w-10 h-10" />
              <h3 className="text-2xl font-bold">Office Address</h3>
              <p className="text-gray-300">Gooty, Andhra Pradesh</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border border-white/20 text-white shadow-xl rounded-2xl p-6 transition-all hover:scale-105 hover:bg-white/20">
            <CardContent className="flex flex-col items-center text-center gap-4">
              <Phone className="text-yellow-400 w-10 h-10" />
              <h3 className="text-2xl font-bold">Phone</h3>
              <p className="text-gray-300">+91-95158 36496</p>
              <p className="text-sm text-gray-400">9:00 AM – 9:00 PM</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border border-white/20 text-white shadow-xl rounded-2xl p-6 transition-all hover:scale-105 hover:bg-white/20">
            <CardContent className="flex flex-col items-center text-center gap-4">
              <Mail className="text-yellow-400 w-10 h-10" />
              <h3 className="text-2xl font-bold">Email</h3>
              <p className="text-gray-300">contact@delbite.com</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-3">Stay connected with us</p>
          {/* <div className="flex justify-center gap-6">
            <a href="#" className="text-blue-500 hover:text-white font-bold text-lg">Facebook</a>
            <a href="#" className="text-pink-500 hover:text-white font-bold text-lg">Instagram</a>
            <a href="#" className="text-cyan-400 hover:text-white font-bold text-lg">Twitter</a>
          </div> */}
        </div>
      </div>
      <FooterInfo />
    </div>
  );
};

export default ContactPage;
