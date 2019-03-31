using G9VN.TIKTAK.Common.ViewsModel;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Data.Repositoris;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Service
{
    public interface IPrintedFormService
    {
        IEnumerable<PrintForm> GetAll();
        PrintForm GetByID(Guid id);
        void Update(PrintForm formview);
        void SaveChanges();
    }
     public class PrintedFormService:IPrintedFormService
    {
        private IPrintedFormRepository _printedFormRepository;
        private IUnitOfWork _unitOfWork;
        public PrintedFormService(IPrintedFormRepository printedFormRepository, IUnitOfWork unitOfWork)
        {
            this._printedFormRepository = printedFormRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<PrintForm> GetAll()
        {
            return _printedFormRepository.GetAll();
        }

        public PrintForm GetByID(Guid id)
        {
            return _printedFormRepository.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _unitOfWork.Commit();
        }

        public void Update(PrintForm formview)
        {
            _printedFormRepository.Update(formview);
        }
    }
}
