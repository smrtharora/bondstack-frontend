import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";

export default function BondStackApp() {
  const [securities, setSecurities] = useState([]);
  const [formData, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveSecurity = async () => {
    if (!formData.scriptName || !formData.isin) return;

    try {
      const res = await fetch("https://bondstack-backend.onrender.com/securities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const saved = await res.json();
        setSecurities([...securities, saved]);
        setFormData({});
      } else {
        console.error("Failed to save:", await res.text());
      }
    } catch (err) {
      console.error("Error posting to backend:", err);
    }
  };

  useEffect(() => {
    fetch("https://bondstack-backend.onrender.com/securities")
      .then((res) => res.json())
      .then((data) => setSecurities(data))
      .catch((err) => console.error("Failed to fetch securities:", err));
  }, []);

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold">BondStack Dashboard</h1>

      <Tabs defaultValue="securities">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="portfolio">Bond Portfolio</TabsTrigger>
          <TabsTrigger value="cashflow">Cashflow Calendar</TabsTrigger>
          <TabsTrigger value="las">LAS Tracker</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="add">Add Bond</TabsTrigger>
          <TabsTrigger value="securities">Securities DB</TabsTrigger>
        </TabsList>

        <TabsContent value="securities">
          <Card>
            <CardContent className="p-4 grid gap-4">
              <h2 className="text-lg font-semibold mb-2">Create New Security</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Script Name</Label>
                  <Input
                    value={formData.scriptName || ""}
                    onChange={(e) => handleInputChange("scriptName", e.target.value)}
                    placeholder="e.g. ABC Realty NCD"
                  />
                </div>
                <div>
                  <Label>ISIN</Label>
                  <Input
                    value={formData.isin || ""}
                    onChange={(e) => handleInputChange("isin", e.target.value)}
                    placeholder="e.g. IN0987654321"
                  />
                </div>
                <div>
                  <Label>Coupon (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.coupon || ""}
                    onChange={(e) => handleInputChange("coupon", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Frequency</Label>
                  <select
                    className="border rounded px-3 py-2 w-full"
                    value={formData.frequency || ""}
                    onChange={(e) => handleInputChange("frequency", e.target.value)}
                  >
                    <option value="">Select frequency</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semiannual">Semi-Annual</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate || ""}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Maturity Date</Label>
                  <Input
                    type="date"
                    value={formData.maturityDate || ""}
                    onChange={(e) => handleInputChange("maturityDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Face Value</Label>
                  <Input
                    type="number"
                    value={formData.faceValue || ""}
                    onChange={(e) => handleInputChange("faceValue", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <Input
                    value={formData.rating || ""}
                    onChange={(e) => handleInputChange("rating", e.target.value)}
                    placeholder="e.g. A+"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label>Cashflow Schedule (Optional Notes)</Label>
                <Textarea
                  value={formData.cashflowNotes || ""}
                  onChange={(e) => handleInputChange("cashflowNotes", e.target.value)}
                  placeholder="You can define specific interest dates or bullet repayments here..."
                />
              </div>

              <Button onClick={handleSaveSecurity} className="mt-4 w-fit">
                Save Security
              </Button>

              {securities.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-2">Saved Securities</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {securities.map((sec) => (
                      <li key={sec._id}>
                        {sec.scriptName} ({sec.isin}) - {sec.coupon}% - {sec.rating}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
