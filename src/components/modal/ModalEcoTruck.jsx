"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalEcoTruck({
  open,
  setOpen,
  onSimulacion,
  onUbicacionReal,
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline outline-1 outline-gray-200 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-md data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            {/* ❌ Botón de cierre */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              aria-label="Cerrar modal"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                  <MapPinIcon
                    aria-hidden="true"
                    className="size-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    ¿Cómo deseas obtener tu ubicación?
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Puedes usar una simulación aleatoria o permitir que
                      EcoTruck acceda a tu ubicación real.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  onUbicacionReal();
                  setOpen(false);
                }}
                className="inline-flex w-full justify-center rounded-md bg-[#2E8B00] px-3 py-2 text-sm font-semibold text-white hover:bg-[#256f00] sm:ml-3 sm:w-auto"
              >
                Usar ubicación real
              </button>
              <button
                type="button"
                onClick={() => {
                  onSimulacion();
                  setOpen(false);
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300 sm:mt-0 sm:w-auto"
              >
                Usar simulación
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
