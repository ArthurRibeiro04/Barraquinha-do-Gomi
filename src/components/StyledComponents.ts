import { Link } from "react-router-dom";
import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('/src/assets/wood_background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: Arial, sans-serif;
  color: white;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  color: #ffffff;
  text-shadow:
    0px 2px 3px rgba(0, 0, 0, 0.25),
    0px 6px 10px rgba(0, 0, 0, 0.18);
  letter-spacing: 2px;
  margin-bottom: 40px;
  user-select: none;
  animation: fadeSlide 0.8s ease forwards;
  @keyframes fadeSlide {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FormularioRegistro = styled.form`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  gap: 15px;
  width: 380px; 
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.7); 
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  height: 380px;  
`;

export const FormularioLogin = styled.form`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  gap: 15px;
  width: 380px; 
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.7); 
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  height: 280px;  
`;

export const Input = styled.input`
  padding: 15px;  
  margin: 2.5px 0;
  width: 90%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #fff;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 12px;
  width: 98%;
  background-color: #de873cff;
  color: white;
  border: 3px solid #b05928ff;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #8e451c;
    border: 3px solid #5e2e13ff;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  text-align: center;
`;

export const ErrorNotification = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #f44336;
  color: white;
  padding: 15px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
  font-weight: 500;
  z-index: 9999;

  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: translateY(${({ show }) => (show ? "0" : "-10px")});
  pointer-events: none;

  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
`;

export const SmallText = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
  color: #444;
`;

export const LoginLink = styled(Link)`
  color: #b4601b;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const HeaderContainer = styled.header`
  width: 100%;
  background: linear-gradient(to bottom, #ffffff, #bbbbbbff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const HeaderTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: 0.06em;
`;

export const HeaderActions = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.75rem;
`;

export const HeaderButton = styled.button`
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #9f5521ff, #6d3416ff);
  color: #f9fafb;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(248, 113, 113, 0.4);

  &:hover {
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const SimpleButton = styled.button`
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #ffffff90;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.55);
  }
`;

export const FiltersRow = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  gap: 0.5rem;
  margin: 1rem auto;
  padding: 0 1rem;
`;

export const FilterButton = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid #ffffff60;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.55);
  }
`;

export const MangaGrid = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0 1rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

export const MangaCard = styled.div`
  background: rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  padding: 0.6rem;
  text-align: center;
  border: 1px solid #ffffff40;
  backdrop-filter: blur(4px);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
  }
`;

export const MangaCover = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 8px;
`;

export const MangaTitle = styled.p`
  margin-top: 0.6rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.03em;
  font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont,
    "Helvetica Neue", sans-serif;
`;

export const MangaVolume = styled.p`
  margin-top: 4px;
  font-size: 0.85rem;
  color: #f1f1f1;
  opacity: 0.85;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-align: center;
  font-family: "Inter", "Segoe UI", Helvetica, Arial, sans-serif;
`;

export const FooterContainer = styled.footer`
  margin-top: auto;
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.75rem;
  color: #ffffffb0;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 30px 0;
  margin-bottom: 40px;
`;

export const PageButton = styled.button<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  text-align: center;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: ${({ isActive }) => (isActive ? "#8b6f47" : "#d6c09c")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#4b3a2f")};
  box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
  transition: 0.2s ease;

  &:hover {
    background: #8b6f47;
    color: #fff;
  }
`;

export const TopActions = styled.div`
  display: flex;
  justify-content: center; /* se quiser à direita, troca por flex-end */
  margin: 20px 0 10px;
`;

export const ReviewButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  background: #8b6f47;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.25);
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

export const ModalSelect = styled.select`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #c1a57b;
  background: #fffef8;
  font-size: 0.9rem;
  color: #000; 
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: #f5e4c6;
  padding: 24px;
  border-radius: 16px;
  min-width: 360px;
  max-width: 420px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  color: #4b3a2f;
`;

export const ModalSubtitle = styled.p`
  margin: 0 0 16px 0;
  font-size: 0.9rem;
  color: #6b5846;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ModalLabel = styled.label`
  font-size: 0.9rem;
  color: #4b3a2f;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ModalInput = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #c1a57b;
  background: #fffef8;
  font-size: 0.9rem;
  color: #000; 
`;

export const ModalTextarea = styled.textarea`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #c1a57b;
  background: #fffef8;
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
  color: #000; 
`;

export const ModalActions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  color: #000; 
`;

export const ModalButtonPrimary = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  background: #8b6f47;
  color: #fff;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const ModalButtonSecondary = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  background: #d6c09c; 
  color: #4b3a2f; 
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const DetailModalContent = styled.div`
  background: #f5e4c6;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 820px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
`;

export const MangaDetailLayout = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MangaDetailCover = styled.img`
  width: 230px;
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.35);
`;

export const MangaDetailInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #4b3a2f;
  font-size: 0.95rem;
`;

export const MangaDetailTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 1.2rem;
  color: #3b2a20;
`;

export const MangaDetailField = styled.p`
  margin: 0;
  line-height: 1.4;

  strong {
    font-weight: 600;
  }
`;

export const ModalButtonDanger = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  background: #b53939; 
  color: #fff;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;
