
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-primary mb-6">Contactez-nous</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une question ? Un besoin d'assistance ? Notre équipe est là pour vous aider. 
              N'hésitez pas à nous contacter.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Nom complet *</label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre.email@exemple.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">Sujet *</label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Sujet de votre message"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Votre message..."
                        rows={6}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Informations de contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Adresse</h3>
                        <p className="text-muted-foreground">
                          123 cites des palmiers<br />
                          75001 douala, cameroun
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Téléphone</h3>
                        <p className="text-muted-foreground">+237 6 23 45 67 89</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">contact@cardiopredict.cm</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Horaires d'ouverture</h3>
                        <p className="text-muted-foreground">
                          Lundi - Vendredi: 9h00 - 18h00<br />
                          Samedi: 9h00 - 12h00<br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Questions fréquentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Combien coûte l'analyse ?</h4>
                        <p className="text-sm text-muted-foreground">
                          La première analyse est gratuite. Les analyses suivantes sont disponibles avec nos plans premium.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Mes données sont-elles sécurisées ?</h4>
                        <p className="text-sm text-muted-foreground">
                          Oui, toutes vos données sont cryptées et stockées selon les normes de sécurité médicale.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Puis-je partager mes résultats avec mon médecin ?</h4>
                        <p className="text-sm text-muted-foreground">
                          Absolument ! Vous pouvez télécharger et partager vos rapports avec votre équipe médicale.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Support technique</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Besoin d'aide technique ? Notre équipe de support est disponible pour vous accompagner.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">Réponse sous 24h</p>
                  <p className="text-sm font-medium">support@cardiopredict.fr</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Support téléphonique</h3>
                  <p className="text-sm text-muted-foreground mb-4">Lun-Ven 9h-17h</p>
                  <p className="text-sm font-medium">+237 6 23 45 67 90</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Chat en direct</h3>
                  <p className="text-sm text-muted-foreground mb-4">Disponible 24/7</p>
                  <Button variant="outline" size="sm">Démarrer le chat</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
