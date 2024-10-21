import { useEffect, useState, useMemo, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Recycle = () => {
  const quotes = useMemo(
    () => [
      "What we throw away can either become a problem or a solution—let's turn food waste into a resource.",
      "Recycling food waste means giving back to the earth what it has given to us.",
      "Composting food waste is nature's way of recycling—it feeds the soil to grow more food.",
      "Food waste is not garbage, it’s an opportunity to give back to the earth through recycling and composting.",
      "We cannot afford to waste food when so many go hungry. Let's recycle wisely, nourish the planet, and its people.",
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [quotes, intervalTime]);

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    uploadedBy: "",
    quantity: "",
    deliveryMethod: "",
    nearbyCenter: "",
    picture: null,
    description: "",
    street: "",
    city: "",
    pincode: "",
    pickupDate: "",
    pickupTime: "",
  });

  const nearbyCenters = ["Center A", "Center B", "Center C"];
  const [showCenterDropdown, setShowCenterDropdown] = useState(false);
  const [showPickupFields, setShowPickupFields] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleDeliveryMethodChange = (method) => {
    setFormData((prevData) => ({
      ...prevData,
      deliveryMethod: method,
      pickupDate: "", 
      pickupTime: "", 
    }));
    setShowCenterDropdown(method === "center");
    setShowPickupFields(method === "pickup"); 
  };

  const handleNearbyCenterSelect = (center) => {
    setFormData((prevData) => ({ ...prevData, nearbyCenter: center }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/png");
    setFormData((prevData) => ({ ...prevData, picture: imageDataUrl }));
  };

  useEffect(() => {
    const initCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    initCamera();
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setFormData((prevData) => ({
        ...prevData,
        latitude,
        longitude,
      }));
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-[80px] mb-[40px] px-5">
      <div className="quote mb-6 text-xl font-semibold text-center text-green-600">
        {quotes[currentIndex]}
      </div>
      <h1 className="text-2xl font-bold mb-6">Recycle Waste Food</h1>

      <form className="space-y-8 bg-green-800 text-white py-[25px] px-[50px] rounded-2xl w-[300px] sm:w-[500px]">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="uploadedBy">Your Name</Label>
          <Input
            type="text"
            id="uploadedBy"
            name="uploadedBy"
            value={formData.uploadedBy}
            required
            placeholder="Your name"
            onChange={handleInputChange}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            type="text"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            required
            readOnly
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            type="text"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            required
            readOnly
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="street">Street</Label>
          <Input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            required
            placeholder="Enter your street"
            onChange={handleInputChange}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            required
            placeholder="Enter your city"
            onChange={handleInputChange}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            required
            placeholder="Enter your pincode"
            onChange={handleInputChange}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="quantity">Quantity (in kg)</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            required
            placeholder="Enter quantity"
            onChange={handleInputChange}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Additional Information</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            rows="4"
            placeholder="Describe the food or any additional information"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="deliveryMethod">Delivery Method</Label>
          <RadioGroup
            value={formData.deliveryMethod}
            onValueChange={handleDeliveryMethodChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="center-option" />
              <Label htmlFor="center-option">Drop-off at nearby center</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup-option" />
              <Label htmlFor="pickup-option">Request for pickup</Label>
            </div>
          </RadioGroup>
        </div>

        {showCenterDropdown && (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="nearbyCenter">Select Nearby Center</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 border border-white rounded-md w-full">
                {formData.nearbyCenter || "Select Nearby Center"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-green-800 border-white text-white">
                <DropdownMenuLabel>Nearby Centers</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {nearbyCenters.map((center) => (
                  <DropdownMenuItem
                    key={center}
                    onClick={() => handleNearbyCenterSelect(center)}
                  >
                    {center}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {showPickupFields && (
          <>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pickupDate">Pickup Date</Label>
              <Input
                type="date"
                id="pickupDate"
                name="pickupDate"
                value={formData.pickupDate}
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pickupTime">Pickup Time</Label>
              <Input
                type="time"
                id="pickupTime"
                name="pickupTime"
                value={formData.pickupTime}
                required
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {/* Video and Capture Section */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Camera</Label>
          <video ref={videoRef} autoPlay className="w-full rounded-lg" />

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={handleCapture}
              className="bg-orange-600 hover:bg-white text-white hover:text-orange-600 rounded-md px-4 py-2 my-2 w-[100px]"
            >
              Capture
            </Button>
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {formData.picture && (
            <img src={formData.picture} alt="Captured" className="rounded-md" />
          )}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-green-600 text-1xl text-white border-2 border-green-600 rounded-3xl hover:bg-white hover:text-green-600 py-[20px]"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Recycle;
