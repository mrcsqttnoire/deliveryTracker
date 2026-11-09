
// export interface IAProposProps {
// }

import { AlertTriangle, BatteryPlus, HatGlasses, LockKeyhole, Map } from "lucide-react";

export default function About () {
    return <>
        <div className="container-custom">
            <div>
                <h2>Delivery Tracker</h2>
                <p>Le suivi de livraison en temps réel pour commerçants malgaches, sans création de compte client</p>
            </div>
            <div>
                <div>
                    <HatGlasses/>
                    <h3>0 compte</h3>
                    <p>requis pour client</p>
                </div>
                <div>
                    <LockKeyhole/>
                    <h3>UUIDv4</h3>
                    <p>Lien direct fb/whatsapp</p>
                </div>
                <div>
                    <BatteryPlus className="-rotate-90"/>
                    <h3>5 à 10s</h3>
                    <p>GPS ultra eco-data</p>
                </div>
                <div>
                    <Map/>
                    <h3>0 Pertes</h3>
                    <p>Suivi en temps réel</p>
                </div>
            </div>
            <div>
                <div>
                    <AlertTriangle/>
                    <div>
                        <h4>Le problème à Madagascar</h4>
                        <div>
                            
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </>
}
