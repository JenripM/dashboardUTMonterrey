import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateAnnouncementEventModal = ({ isOpen, onClose }) => {
  const [type, setType] = useState("anuncio"); // "anuncio" | "evento"
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Nuevos campos
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [modality, setModality] = useState("presencial"); // presencial | virtual | hibrido
  const [location, setLocation] = useState("");
  const [segment, setSegment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const resetAll = () => {
    setType("anuncio");
    setEmails("");
    setSubject("");
    setMessage("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setModality("presencial");
    setLocation("");
    setSegment("");
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Validaciones básicas
    if (!emails.trim()) {
      setError("Agrega al menos un email.");
      return;
    }
    // Si es evento, requerir fecha y hora inicio
    if (type === "evento") {
      if (!date) {
        setError("Selecciona la fecha del evento.");
        return;
      }
      if (!startTime) {
        setError("Selecciona la hora de inicio del evento.");
        return;
      }
    }

    setIsLoading(true);

    try {
      const emailArray = emails
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x.length > 0);

      const payload = {
        email: emailArray,
        displayName: "admin",
        asunto: subject,
        mensaje: message,
        tipo: type,
        fecha: date || null,
        horaInicio: startTime || null,
        horaFin: endTime || null,
        modalidad: modality,
        lugar: location,
        segmentacion: segment,
      };

      const response = await fetch("/api/email/b2banuncios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // intentar leer mensaje de error del backend si existe
        let text = "Error al enviar el correo";
        try {
          const json = await response.json();
          if (json?.message) text = json.message;
        } catch (_) {}
        throw new Error(text);
      }

      // éxito
      setSuccessMsg("Correo(s) enviado(s) correctamente.");
      resetAll();
      onClose();
    } catch (err) {
      setError(err.message || "Error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto w-full max-w-2xl px-4">
        <form onSubmit={handleSubmit}>
          <div className="border w-full overflow-hidden rounded-lg bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">
                Enviar anuncio / evento
              </h2>
              <button
                type="button"
                onClick={() => {
                  resetAll();
                  onClose();
                }}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-5">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {successMsg}
                </div>
              )}

              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo
                </label>
                <div className="inline-flex mt-2 rounded-md border border-gray-300 bg-gray-50 p-1">
                  <button
                    type="button"
                    onClick={() => setType("evento")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      type === "evento"
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Evento
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("anuncio")}
                    className={`ml-1 px-4 py-2 text-sm font-medium rounded-md ${
                      type === "anuncio"
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Anuncio
                  </button>
                </div>
              </div>

              {/* Emails */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Emails (separados por coma)
                </label>
                <input
                  type="text"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="ejemplo1@mail.com, ejemplo2@mail.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              {/* Asunto / Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Asunto / Título
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Escribe el asunto"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Mensaje / Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mensaje / Descripción
                </label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Fecha (si es evento) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha {type === "evento" ? "(requerida para eventos)" : "(opcional)"}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required={type === "evento"}
                />
              </div>

              {/* Hora inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora de inicio {type === "evento" ? "(requerida para eventos)" : "(opcional)"}
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required={type === "evento"}
                />
              </div>

              {/* Hora fin (opcional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora de fin (opcional)
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Modalidad */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Modalidad
                </label>
                <select
                  value={modality}
                  onChange={(e) => setModality(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="presencial">Presencial</option>
                  <option value="virtual">Virtual</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>

              {/* Lugar / Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lugar o link
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej: Auditorio / https://meet.example.com/..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Segmentación */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Segmentación (carrera, ciclo, sede, etc.)
                </label>
                <input
                  type="text"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  placeholder="Ej: Ingeniería de Sistemas - Ciclo 3 - Sede Trujillo"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  resetAll();
                  onClose();
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementEventModal;
