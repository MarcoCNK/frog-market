import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 py-8 md:py-16">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-lg font-bold mb-4">We are not responsibile if you:</h2>
                    <ul className="space-y-2">
                        <li className="text-green-500" >
                                Don't like our website design, we make it in google and there it looks fine
                        </li>
                        <li className="text-green-500" >
                            You get dizzy by reading the tittle
                        </li>
                        <li className="text-green-500" >
                            If you lost your products
                        </li>
                        <li className="text-green-500" >
                            Basically we are not responsible for anything.
                        </li>
                    </ul>
                </div>

                <div>
                    <img
                        src="/public/frogLogo.png"
                        alt="Froggy Market Logo"
                        className="w-32 h-32 object-contain"
                    />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="bg-gray-900 py-4 text-center">
                <p className="text-sm font-medium">
                    Froggy Market® &copy; {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
